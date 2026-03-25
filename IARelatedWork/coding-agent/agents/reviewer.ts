import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { PROJECT_CONTEXT } from '../context.js'
import { readFileTool, dispatchTool } from '../tools.js'
import type { ReviewResult } from '../types.js'

const client = new Anthropic()

const ReviewResultSchema = z.object({
  filePath: z.string(),
  approved: z.boolean(),
  issues: z.array(
    z.object({
      severity: z.enum(['critical', 'suggestion']),
      filePath: z.string(),
      message: z.string(),
    })
  ),
})

const SYSTEM = `
You are a strict code reviewer for a TypeScript calendar application.
Review a single file and flag only real, verifiable issues.

${PROJECT_CONTEXT}

Focus on:
1. Mandatory conventions (named exports, no "as", no "any", one component per file, service hook pattern)
2. Type safety issues
3. Logic bugs or missing edge-case handling
4. N+1 query patterns

Return ONLY a JSON object — no markdown fences, no explanation:
{
  "filePath": "string",
  "approved": true | false,
  "issues": [
    { "severity": "critical" | "suggestion", "filePath": "string", "message": "string" }
  ]
}

approved must be false if there is at least one critical issue.
`.trim()

function stripFences(text: string): string {
  return text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
}

export async function runReviewerAgent(filePath: string): Promise<ReviewResult> {
  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: `Review this file: ${filePath}` },
  ]

  for (let turn = 0; turn < 8; turn++) {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      system: SYSTEM,
      tools: [readFileTool],
      messages,
    })

    if (response.stop_reason === 'end_turn') {
      const textBlock = response.content.find((b) => b.type === 'text')
      const text = textBlock?.type === 'text' ? textBlock.text : ''
      let raw: unknown
      try {
        raw = JSON.parse(stripFences(text))
      } catch {
        return { filePath, approved: false, issues: [{ severity: 'critical', filePath, message: 'Reviewer returned non-JSON output' }] }
      }
      const parsed = ReviewResultSchema.safeParse(raw)
      if (!parsed.success) {
        return {
          filePath,
          approved: false,
          issues: [{ severity: 'critical', filePath, message: 'Reviewer returned unparseable output' }],
        }
      }
      return parsed.data
    }

    if (response.stop_reason === 'tool_use') {
      const toolResults: Anthropic.ToolResultBlockParam[] = response.content.flatMap((b) => {
        if (b.type !== 'tool_use') return []
        return [{ type: 'tool_result' as const, tool_use_id: b.id, content: dispatchTool(b.name, b.input) }]
      })
      messages.push({ role: 'assistant', content: response.content })
      messages.push({ role: 'user', content: toolResults })
    }
  }

  throw new Error(`Reviewer agent exceeded maximum turn limit for: ${filePath}`)
}
