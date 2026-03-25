import { css } from '@styled-system/css'
import { useState } from 'react'
import { Effect, pipe } from 'effect'
import { ChapterLayout, Section } from '../shared/ChapterLayout'
import { Callout } from '../shared/Callout'
import { CodeBlock } from '../shared/CodeBlock'

const PIPE_CODE = `import { pipe } from 'effect'

// pipe threads a value through a sequence of functions left-to-right
const result = pipe(
    5,
    (n) => n * 2,     // 10
    (n) => n + 1,     // 11
    (n) => \`n=\${n}\`, // "n=11"
)
// result = "n=11"

// Without pipe you would write:
const ugly = \`n=\${((5 * 2) + 1)}\`
// Readable but nests badly as complexity grows`

const MAP_CODE = `import { Effect, pipe } from 'effect'

// Effect.map — transform the SUCCESS value (like Array.map)
// It leaves the error type untouched
const doubled = pipe(
    Effect.succeed(21),
    Effect.map((n) => n * 2),
    // Type: Effect<number, never, never>
)

// map is safe — if the effect already failed, map is skipped:
const skipped = pipe(
    Effect.fail("oops"),
    Effect.map((n) => n * 2), // never called
    // Type: Effect<never, string, never>
)`

const FLATMAP_CODE = `import { Effect, pipe } from 'effect'

// Effect.flatMap — transform success into a NEW Effect
// Use when the transformation itself can succeed or fail
function parseTodoTitle(raw: string): Effect.Effect<string, Error> {
    return raw.trim().length === 0
        ? Effect.fail(new Error("Title cannot be empty"))
        : Effect.succeed(raw.trim())
}

const result = pipe(
    Effect.succeed("  Buy milk  "),
    Effect.flatMap(parseTodoTitle),   // Effect<string, Error>
    Effect.map((title) => title.toUpperCase()),
)
// ✅  "BUY MILK"

const failed = pipe(
    Effect.succeed("   "),
    Effect.flatMap(parseTodoTitle),   // fails here
    Effect.map((title) => title.toUpperCase()), // never reached
)
// ❌  Error("Title cannot be empty")`

const TAP_CODE = `import { Effect, pipe } from 'effect'

// Effect.tap — run a side effect, but keep the original value flowing
// Perfect for logging, analytics, or debugging mid-pipeline
const result = pipe(
    Effect.succeed({ id: "1", title: "Learn Effect" }),
    Effect.tap((todo) => Effect.sync(() => console.log("Created:", todo))),
    Effect.map((todo) => ({ ...todo, done: false })),
    // The tap's result is discarded; the todo keeps flowing
)
// Console: "Created: { id: '1', title: 'Learn Effect' }"
// result: { id: "1", title: "Learn Effect", done: false }`

const PIPELINE_CODE = `// A full pipeline: raw input → validated Todo
function createTodo(raw: string): Effect.Effect<Todo, Error> {
    return pipe(
        Effect.succeed(raw),
        Effect.flatMap(parseTodoTitle),
        Effect.tap((title) => Effect.sync(() => console.log(\`Creating "\${title}"...\`))),
        Effect.map((title) => ({
            id: crypto.randomUUID(),
            title,
            done: false,
            createdAt: new Date(),
        })),
    )
}`

function parseTodoTitle(raw: string): Effect.Effect<string, Error> {
    return raw.trim().length === 0
        ? Effect.fail(new Error('Title cannot be empty'))
        : Effect.succeed(raw.trim())
}

interface StepState {
    input: string
    steps: { label: string; value: string; ok: boolean }[]
}

export function Ch03Pipelines() {
    const [input, setInput] = useState('  Buy milk  ')
    const [state, setState] = useState<StepState | null>(null)

    function runPipeline() {
        const steps: StepState['steps'] = []

        const raw = input
        steps.push({ label: 'Input', value: JSON.stringify(raw), ok: true })

        const trimmed = raw.trim()
        steps.push({ label: 'After trim()', value: JSON.stringify(trimmed), ok: trimmed.length > 0 })

        if (trimmed.length === 0) {
            setState({ input: raw, steps })
            return
        }

        const upper = trimmed.toUpperCase()
        steps.push({ label: 'toUpperCase()', value: JSON.stringify(upper), ok: true })

        const todo = { id: '42', title: upper, done: false }
        steps.push({ label: 'Final Todo', value: JSON.stringify(todo, null, 2), ok: true })

        setState({ input: raw, steps })
    }

    const demoResult = Effect.runSync(
        pipe(
            Effect.succeed(input),
            Effect.flatMap(parseTodoTitle),
            Effect.match({
                onSuccess: (v) => `✅ "${v}"`,
                onFailure: (e) => `❌ ${e.message}`,
            })
        )
    )

    return (
        <ChapterLayout
            number={3}
            title="Pipelines"
            subtitle="Chain Effects together with pipe, map, flatMap, and tap to build expressive, readable data transformation sequences."
        >
            <Section title="pipe — threading values through functions">
                <CodeBlock code={PIPE_CODE} />
                <Callout variant="info" title="pipe is not Effect-specific">
                    <code>pipe</code> from <code>effect</code> works with any value, not just Effects.
                    It's the foundation for left-to-right functional composition throughout the library.
                </Callout>
            </Section>

            <Section title="Effect.map — transform the success value">
                <CodeBlock code={MAP_CODE} />
                <Callout variant="tip" title="map is lazy and safe">
                    <code>map</code> only runs if the preceding effect succeeded. If the effect is already
                    in a failure state, <code>map</code> is skipped entirely — failures propagate
                    automatically through the pipeline.
                </Callout>
            </Section>

            <Section title="Effect.flatMap — chain into a new Effect">
                <CodeBlock code={FLATMAP_CODE} />
                <Callout variant="concept" title="flatMap = the secret weapon">
                    Use <code>flatMap</code> whenever your transformation can itself succeed or fail.
                    It lets you compose Effects that depend on each other's results — the core of any
                    non-trivial workflow.
                </Callout>
            </Section>

            <Section title="Effect.tap — observe without changing">
                <CodeBlock code={TAP_CODE} />
            </Section>

            <Section title="Putting it together">
                <CodeBlock code={PIPELINE_CODE} />
            </Section>

            <Section title="Interactive pipeline visualizer">
                <div
                    className={css({
                        backgroundColor: '#1e1e1e',
                        borderRadius: '8px',
                        border: '1px solid #3b3b3b',
                        overflow: 'hidden',
                    })}
                >
                    <div className={css({ padding: '0.75rem 1rem', borderBottom: '1px solid #3b3b3b' })}>
                        <div className={css({ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' })}>
                            Enter a title and watch each pipeline step
                        </div>
                        <div className={css({ display: 'flex', gap: '0.5rem' })}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className={css({
                                    flex: 1,
                                    backgroundColor: '#2e2e2e',
                                    border: '1px solid #3b3b3b',
                                    borderRadius: '6px',
                                    padding: '0.4rem 0.75rem',
                                    color: 'white',
                                    fontSize: '0.88rem',
                                    fontFamily: 'monospace',
                                    outline: 'none',
                                    _focus: { borderColor: '#a78bfa' },
                                })}
                                placeholder="Type a todo title..."
                            />
                            <button
                                onClick={runPipeline}
                                className={css({
                                    padding: '0.4rem 1rem',
                                    backgroundColor: '#7c3aed',
                                    border: 'none',
                                    borderRadius: '6px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    _hover: { backgroundColor: '#6d28d9' },
                                })}
                            >
                                Run pipeline
                            </button>
                        </div>
                        <div className={css({ marginTop: '0.4rem', fontSize: '0.78rem', fontFamily: 'monospace' })}>
                            <span className={css({ color: 'rgba(255,255,255,0.4)' })}>parseTodoTitle result: </span>
                            <span style={{ color: demoResult.startsWith('✅') ? '#86efac' : '#fca5a5' }}>
                                {demoResult}
                            </span>
                        </div>
                    </div>
                    {state && (
                        <div className={css({ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' })}>
                            {state.steps.map((step, i) => (
                                <div
                                    key={i}
                                    className={css({ display: 'flex', alignItems: 'baseline', gap: '0.75rem', fontSize: '0.82rem', fontFamily: 'monospace' })}
                                >
                                    <span className={css({ color: 'rgba(255,255,255,0.35)', minWidth: '110px' })}>
                                        {step.label}
                                    </span>
                                    <span
                                        className={css({ fontSize: '0.75rem' })}
                                        style={{ color: step.ok ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)' }}
                                    >
                                        →
                                    </span>
                                    <span
                                        style={{ color: step.ok ? '#93c5fd' : '#fca5a5', whiteSpace: 'pre' }}
                                    >
                                        {step.value}
                                    </span>
                                    {!step.ok && (
                                        <span className={css({ color: '#fca5a5', fontSize: '0.75rem' })}>
                                            ❌ pipeline short-circuits here
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Section>
        </ChapterLayout>
    )
}
