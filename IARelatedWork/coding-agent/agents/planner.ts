import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { PROJECT_CONTEXT } from '../context.js'
import { readFileTool, searchCodeTool, bashTool, dispatchTool } from '../tools.js'
import type { ImplementationPlan } from '../types.js'

const client = new Anthropic()

const PlanSchema = z.object({
  goal: z.string(),
  steps: z.array(
    z.object({
      id: z.string(),
      description: z.string(),
      filesToCreate: z.array(z.string()),
      filesToModify: z.array(z.string()),
      dependsOn: z.array(z.string()),
    })
  ),
})

const SYSTEM = `
You are a senior software architect for a TypeScript calendar application.
Read the codebase and produce a precise, step-by-step implementation plan.

${PROJECT_CONTEXT}

Rules for the plan:
- Break the goal into small, focused steps (1 step = 1-3 files max)
- Set dependsOn accurately — steps that share no files and don't depend on each other MUST have empty dependsOn so they run in parallel
- List exact relative file paths in filesToCreate and filesToModify
- Each description must be specific enough for a coder to implement without asking questions

Return ONLY a JSON object — no markdown fences, no explanation:
{
  "goal": "string",
  "steps": [
    {
      "id": "step-1",
      "description": "...",
      "filesToCreate": ["src/path/to/File.tsx"],
      "filesToModify": ["src/path/to/Existing.ts"],
      "dependsOn": []
    }
  ]
}
`.trim()

function stripFences(text: string): string {
  return text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
}

export async function runPlannerAgent(goal: string): Promise<ImplementationPlan> {
  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: `Plan the implementation for: ${goal}` },
  ]

  for (let turn = 0; turn < 15; turn++) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: SYSTEM,
      tools: [readFileTool, searchCodeTool, bashTool],
      messages,
    })

    if (response.stop_reason === 'end_turn') {
      const textBlock = response.content.find((b) => b.type === 'text')
      const text = textBlock?.type === 'text' ? textBlock.text : ''
      let raw: unknown
      try {
        raw = JSON.parse(stripFences(text))
      } catch {
        throw new Error(`Planner returned non-JSON output: ${text.slice(0, 200)}`)
      }
      const parsed = PlanSchema.safeParse(raw)
      if (!parsed.success) throw new Error(`Planner returned invalid plan: ${parsed.error.message}`)
      console.log(`[planner] Plan produced: ${parsed.data.steps.length} steps`)
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

  throw new Error('Planner agent exceeded maximum turn limit')
}
