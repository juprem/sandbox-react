import { execSync } from 'node:child_process'
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'

const ExecErrorSchema = z.object({
  stdout: z.string().optional(),
  stderr: z.string().optional(),
  message: z.string(),
})
import { PROJECT_CONTEXT } from '../context.js'
import { readFileTool, writeFileTool, bashTool, dispatchTool, ROOT } from '../tools.js'
import type { TestResult } from '../types.js'

const client = new Anthropic()

const SYSTEM = `
You are a test-fixing specialist for a TypeScript calendar application.
You receive failing Vitest output and must fix the implementation code to make the tests pass.

${PROJECT_CONTEXT}

Rules:
- Read the failing test file to understand what is expected
- Read the implementation file to understand what is wrong
- Fix only what is necessary — do not rewrite passing code
- When done, output: { "done": true }
`.trim()

function runTestSuite(): TestResult {
  try {
    const output = execSync('npm test -- --reporter=verbose 2>&1', {
      cwd: ROOT,
      encoding: 'utf-8',
      timeout: 120_000,
    })
    return { passed: true, failures: [], rawOutput: output }
  } catch (err) {
    const parsed = ExecErrorSchema.safeParse(err)
    const rawOutput = parsed.success
      ? (parsed.data.stdout ?? parsed.data.stderr ?? parsed.data.message)
      : String(err)
    const failures = [...rawOutput.matchAll(/✗\s+(.+)\n[\s\S]*?Error:\s+(.+)/gm)].map((m) => ({
      testName: m[1].trim(),
      errorMessage: m[2].trim(),
    }))
    return { passed: false, failures, rawOutput }
  }
}

async function runFixAgent(failureOutput: string): Promise<void> {
  const messages: Anthropic.MessageParam[] = [
    {
      role: 'user',
      content: `The following tests are failing. Read the relevant files and fix the implementation.\n\n${failureOutput}`,
    },
  ]

  for (let turn = 0; turn < 15; turn++) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      system: SYSTEM,
      tools: [readFileTool, writeFileTool, bashTool],
      messages,
    })

    if (response.stop_reason === 'end_turn') return

    if (response.stop_reason === 'tool_use') {
      const toolResults: Anthropic.ToolResultBlockParam[] = response.content.flatMap((b) => {
        if (b.type !== 'tool_use') return []
        return [{ type: 'tool_result' as const, tool_use_id: b.id, content: dispatchTool(b.name, b.input) }]
      })
      messages.push({ role: 'assistant', content: response.content })
      messages.push({ role: 'user', content: toolResults })
    }
  }
}

export async function runTestRunnerAgent(maxFixAttempts = 3): Promise<TestResult> {
  for (let attempt = 1; attempt <= maxFixAttempts; attempt++) {
    console.log(`\n[test-runner] Running test suite (attempt ${attempt}/${maxFixAttempts})`)
    const testResult = runTestSuite()

    if (testResult.passed) {
      console.log('[test-runner] All tests passed ✓')
      return testResult
    }

    console.log(`[test-runner] ${testResult.failures.length} failure(s) — spawning fix agent`)
    await runFixAgent(testResult.rawOutput)
  }

  const final = runTestSuite()
  if (!final.passed) {
    console.warn(`[test-runner] ${final.failures.length} test(s) still failing after ${maxFixAttempts} fix attempts`)
  }
  return final
}
