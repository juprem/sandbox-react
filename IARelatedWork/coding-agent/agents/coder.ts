import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'

const WritePathInput = z.object({ path: z.string().optional() })
import { PROJECT_CONTEXT } from '../context.js'
import { readFileTool, writeFileTool, searchCodeTool, dispatchTool } from '../tools.js'
import type { PlanStep, CoderResult, ReviewIssue } from '../types.js'

const client = new Anthropic()

const CoderSummarySchema = z.object({
  success: z.boolean(),
  filesWritten: z.array(z.string()),
})

const SYSTEM = `
You are a senior TypeScript developer implementing features in a calendar application.
Implement exactly what is described in the plan step — nothing more.

${PROJECT_CONTEXT}

Rules:
- Write complete, production-ready code — no placeholders, no TODOs
- Follow ALL mandatory conventions above
- Always read existing files before modifying them
- When all files are written, output a single JSON object:
  { "success": true, "filesWritten": ["relative/path/to/file.ts"] }
`.trim()

function stripFences(text: string): string {
  return text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
}

export async function runCoderAgent(
  step: PlanStep,
  reviewFeedback?: ReviewIssue[]
): Promise<CoderResult> {
  const feedbackSection = reviewFeedback?.length
    ? `\n\nREVIEWER FEEDBACK TO FIX (do not touch approved files):\n${reviewFeedback.map((i) => `- [${i.severity}] ${i.filePath}: ${i.message}`).join('\n')}`
    : ''

  const messages: Anthropic.MessageParam[] = [
    {
      role: 'user',
      content:
        `Implement the following step:\n\n${step.description}\n\n` +
        `Files to create: ${step.filesToCreate.join(', ') || 'none'}\n` +
        `Files to modify: ${step.filesToModify.join(', ') || 'none'}` +
        feedbackSection,
    },
  ]

  const writtenFiles: string[] = []

  for (let turn = 0; turn < 20; turn++) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      system: SYSTEM,
      tools: [readFileTool, writeFileTool, searchCodeTool],
      messages,
    })

    if (response.stop_reason === 'end_turn') {
      const textBlock = response.content.find((b) => b.type === 'text')
      const text = textBlock?.type === 'text' ? textBlock.text : ''
      let raw: unknown
      try {
        raw = JSON.parse(stripFences(text))
      } catch {
        raw = {}
      }
      const parsed = CoderSummarySchema.safeParse(raw)
      return {
        stepId: step.id,
        changes: (parsed.success ? parsed.data.filesWritten : writtenFiles).map((p) => ({
          path: p,
          operation: step.filesToCreate.includes(p) ? 'create' : 'modify',
        })),
        success: parsed.success ? parsed.data.success : writtenFiles.length > 0,
      }
    }

    if (response.stop_reason === 'tool_use') {
      const toolResults: Anthropic.ToolResultBlockParam[] = response.content.flatMap((b) => {
        if (b.type !== 'tool_use') return []
        const result = dispatchTool(b.name, b.input)
        if (b.name === 'write_file') {
          const pathParsed = WritePathInput.safeParse(b.input)
          if (pathParsed.success && pathParsed.data.path) writtenFiles.push(pathParsed.data.path)
        }
        return [{ type: 'tool_result' as const, tool_use_id: b.id, content: result }]
      })
      messages.push({ role: 'assistant', content: response.content })
      messages.push({ role: 'user', content: toolResults })
    }
  }

  throw new Error(`Coder agent exceeded maximum turn limit for step: ${step.id}`)
}
