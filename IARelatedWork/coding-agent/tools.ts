import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'
import type Anthropic from '@anthropic-ai/sdk'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const ROOT = path.resolve(__dirname, '..')

// ---------------------------------------------------------------------------
// Anthropic tool definitions
// ---------------------------------------------------------------------------

export const readFileTool = {
  name: 'read_file',
  description: 'Read the contents of a file at the given path relative to the project root.',
  input_schema: {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'File path relative to project root, e.g. src/components/Layout/Layout.tsx' },
    },
    required: ['path'],
  },
} satisfies Anthropic.Tool

export const writeFileTool = {
  name: 'write_file',
  description: 'Write or overwrite a file. Creates parent directories automatically.',
  input_schema: {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'File path relative to project root' },
      content: { type: 'string', description: 'Full file content to write' },
    },
    required: ['path', 'content'],
  },
} satisfies Anthropic.Tool

export const searchCodeTool = {
  name: 'search_code',
  description: 'Search for a pattern in the codebase using grep. Returns matching lines with file and line number.',
  input_schema: {
    type: 'object',
    properties: {
      pattern: { type: 'string', description: 'grep regex pattern to search for' },
      directory: { type: 'string', description: 'Directory to search in, relative to project root. Defaults to src/' },
    },
    required: ['pattern'],
  },
} satisfies Anthropic.Tool

export const bashTool = {
  name: 'bash',
  description: 'Run a read-only shell command in the project root (ls, find, cat, npm test). Do NOT use to write files — use write_file instead.',
  input_schema: {
    type: 'object',
    properties: {
      command: { type: 'string', description: 'The shell command to run' },
      timeout_ms: { type: 'number', description: 'Timeout in milliseconds. Defaults to 30000.' },
    },
    required: ['command'],
  },
} satisfies Anthropic.Tool

// ---------------------------------------------------------------------------
// Input schemas (Zod — no "as" assertions)
// ---------------------------------------------------------------------------

const ReadFileInput = z.object({
  path: z.string().min(1),
})

const WriteFileInput = z.object({
  path: z.string().min(1),
  content: z.string(),
})

const SearchCodeInput = z.object({
  pattern: z.string().min(1),
  directory: z.string().optional(),
})

const BashInput = z.object({
  command: z.string().min(1),
  timeout_ms: z.number().optional(),
})

// ---------------------------------------------------------------------------
// Tool execution
// ---------------------------------------------------------------------------

export function executeReadFile(raw: unknown): string {
  const result = ReadFileInput.safeParse(raw)
  if (!result.success) return JSON.stringify({ error: 'Invalid read_file input' })
  const fullPath = path.join(ROOT, result.data.path)
  if (!fs.existsSync(fullPath)) return JSON.stringify({ error: `File not found: ${result.data.path}` })
  return fs.readFileSync(fullPath, 'utf-8')
}

export function executeWriteFile(raw: unknown): string {
  const result = WriteFileInput.safeParse(raw)
  if (!result.success) return JSON.stringify({ error: 'Invalid write_file input' })
  const fullPath = path.join(ROOT, result.data.path)
  fs.mkdirSync(path.dirname(fullPath), { recursive: true })
  fs.writeFileSync(fullPath, result.data.content, 'utf-8')
  console.log(`  [write_file] ${result.data.path}`)
  return JSON.stringify({ success: true, path: result.data.path })
}

export function executeSearchCode(raw: unknown): string {
  const result = SearchCodeInput.safeParse(raw)
  if (!result.success) return JSON.stringify({ error: 'Invalid search_code input' })
  const dir = path.join(ROOT, result.data.directory ?? 'src')
  try {
    const output = execSync(
      `grep -r --include="*.ts" --include="*.tsx" -n "${result.data.pattern}" "${dir}"`,
      { encoding: 'utf-8', timeout: 10_000 }
    )
    return output.trim() || '(no matches)'
  } catch {
    return '(no matches)'
  }
}

export function executeBash(raw: unknown): string {
  const result = BashInput.safeParse(raw)
  if (!result.success) return JSON.stringify({ error: 'Invalid bash input' })
  try {
    const output = execSync(result.data.command, {
      cwd: ROOT,
      encoding: 'utf-8',
      timeout: result.data.timeout_ms ?? 30_000,
    })
    return output.trim() || '(no output)'
  } catch (err) {
    return JSON.stringify({ error: err instanceof Error ? err.message : String(err) })
  }
}

export function dispatchTool(name: string, input: unknown): string {
  switch (name) {
    case 'read_file':   return executeReadFile(input)
    case 'write_file':  return executeWriteFile(input)
    case 'search_code': return executeSearchCode(input)
    case 'bash':        return executeBash(input)
    default:            return JSON.stringify({ error: `Unknown tool: ${name}` })
  }
}
