import { css } from '@styled-system/css'
import { useState } from 'react'
import { Effect, Data, pipe } from 'effect'
import { ChapterLayout, Section } from '../shared/ChapterLayout'
import { Callout } from '../shared/Callout'
import { CodeBlock } from '../shared/CodeBlock'

class ValidationError extends Data.TaggedError('ValidationError')<{
    readonly message: string
}> {}

const INTRO_CODE = `// Effect.gen uses JavaScript generators to give you
// "async/await"-style syntax for Effect pipelines.
//
// Instead of writing:
const withPipe = pipe(
    fetchUser(userId),
    Effect.flatMap((user) =>
        pipe(
            fetchPosts(user.id),
            Effect.map((posts) => ({ user, posts }))
        )
    )
)

// You can write:
const withGen = Effect.gen(function* () {
    const user  = yield* fetchUser(userId)
    const posts = yield* fetchPosts(user.id)
    return { user, posts }
})`

const SIDE_BY_SIDE_CODE = `// ─── With pipe + flatMap ────────────────────────────────────
function createTodoPipe(title: string): Effect.Effect<Todo, ValidationError> {
    return pipe(
        validateTitle(title),
        Effect.flatMap((clean) =>
            Effect.sync(() => ({
                id: crypto.randomUUID(),
                title: clean,
                done: false,
            }))
        ),
        Effect.tap((todo) =>
            Effect.sync(() => console.log("Created:", todo.id))
        )
    )
}

// ─── With Effect.gen ─────────────────────────────────────────
function createTodoGen(title: string): Effect.Effect<Todo, ValidationError> {
    return Effect.gen(function* () {
        const clean = yield* validateTitle(title)

        const todo = yield* Effect.sync(() => ({
            id: crypto.randomUUID(),
            title: clean,
            done: false,
        }))

        yield* Effect.sync(() => console.log("Created:", todo.id))

        return todo
    })
}`

const YIELD_EXPLAINED_CODE = `// yield* unwraps the Effect and gives you its success value
// If the effect FAILS, the generator stops and the error propagates

const program = Effect.gen(function* () {
    // yield* is like "await" — pauses until the effect resolves
    const n = yield* Effect.succeed(21)  // n: number = 21

    // If this fails, the rest of the generator never runs
    const validated = yield* validatePositive(n)

    // Return the final value
    return validated * 2
})`

const ERROR_PROPAGATION_CODE = `// Error propagation works automatically through generators
function processOrder(orderId: string) {
    return Effect.gen(function* () {
        // If fetchOrder fails with NotFoundError → stops here
        const order = yield* fetchOrder(orderId)

        // If validateOrder fails with ValidationError → stops here
        const validated = yield* validateOrder(order)

        // If chargeCard fails with PaymentError → stops here
        const receipt = yield* chargeCard(validated)

        return receipt
        // Return type: Effect<Receipt, NotFoundError | ValidationError | PaymentError, ...>
        // All errors are automatically UNION-ed in the return type
    })
}`

const SERVICE_GEN_CODE = `// Effect.gen shines brightest with services
// yield* ServiceTag retrieves the service from context
function addTodo(title: string) {
    return Effect.gen(function* () {
        const repo = yield* TodoRepository  // inject service

        const clean = yield* validateTitle(title)

        const todo = yield* repo.add(clean)

        yield* Effect.sync(() => analytics.track("todo_created"))

        return todo
    })
}`

class MultiStepError extends Data.TaggedError('MultiStepError')<{
    readonly step: string
    readonly reason: string
}> {}

function step1(n: number): Effect.Effect<number, MultiStepError> {
    return n <= 0
        ? Effect.fail(new MultiStepError({ step: 'step1', reason: 'Must be positive' }))
        : Effect.succeed(n * 3)
}

function step2(n: number): Effect.Effect<string, MultiStepError> {
    return n > 100
        ? Effect.fail(new MultiStepError({ step: 'step2', reason: 'Value too large (>100)' }))
        : Effect.succeed(`Result: ${n}`)
}

function step3(s: string): Effect.Effect<{ label: string; length: number }, never> {
    return Effect.succeed({ label: s, length: s.length })
}

interface RunLog {
    step: string
    value: string
    ok: boolean
}

export function Ch05EffectGen() {
    const [inputNum, setInputNum] = useState('10')
    const [logs, setLogs] = useState<RunLog[]>([])
    const [finalResult, setFinalResult] = useState<string | null>(null)

    function runDemo() {
        const n = Number(inputNum) || 0
        const newLogs: RunLog[] = []

        const program = Effect.gen(function* () {
            newLogs.push({ step: 'Input', value: String(n), ok: true })

            const s1 = yield* step1(n)
            newLogs.push({ step: 'step1 (×3)', value: String(s1), ok: true })

            const s2 = yield* step2(s1)
            newLogs.push({ step: 'step2 (toString)', value: s2, ok: true })

            const s3 = yield* step3(s2)
            newLogs.push({ step: 'step3 (wrap)', value: JSON.stringify(s3), ok: true })

            return s3
        })

        const result = Effect.runSync(
            pipe(
                program,
                Effect.match({
                    onSuccess: (v) => ({ ok: true, msg: JSON.stringify(v) }),
                    onFailure: (e) => ({ ok: false, msg: `[${e._tag}] (${e.step}) ${e.reason}` }),
                })
            )
        )

        if (!result.ok) {
            const lastOk = newLogs.at(-1)
            if (lastOk) lastOk.ok = false
            newLogs.push({ step: 'Error', value: result.msg, ok: false })
        }

        setLogs(newLogs)
        setFinalResult(result.ok ? `✅ ${result.msg}` : `❌ ${result.msg}`)
    }

    return (
        <ChapterLayout
            number={5}
            title="Effect.gen"
            subtitle="Generator syntax lets you write sequential Effect pipelines that look like ordinary async/await code, without sacrificing type safety or composability."
        >
            <Section title="Why Effect.gen exists">
                <CodeBlock code={INTRO_CODE} />
                <Callout variant="concept" title="Effect.gen is syntax sugar, not magic">
                    Under the hood, <code>Effect.gen</code> desugars to exactly the same{' '}
                    <code>flatMap</code> calls as the pipe version. It's a developer ergonomics tool —
                    choose whichever style feels more readable for your team.
                </Callout>
            </Section>

            <Section title="Side-by-side comparison">
                <CodeBlock code={SIDE_BY_SIDE_CODE} />
                <Callout variant="tip" title="gen excels at multi-step, branching logic">
                    The more steps and conditionals your pipeline has, the more gen wins on readability.
                    For simple single-step transformations, <code>pipe + map</code> is often cleaner.
                </Callout>
            </Section>

            <Section title="How yield* works">
                <CodeBlock code={YIELD_EXPLAINED_CODE} />
                <Callout variant="info" title="yield* ≈ await">
                    <ul className={css({ margin: '0', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' })}>
                        <li><code>yield*</code> unwraps the Effect's success value</li>
                        <li>If the Effect fails, the generator stops and the failure propagates up</li>
                        <li>You never write <code>try/catch</code> — errors flow through the type system</li>
                    </ul>
                </Callout>
            </Section>

            <Section title="Automatic error union">
                <CodeBlock code={ERROR_PROPAGATION_CODE} />
            </Section>

            <Section title="gen + services (preview of Ch06)">
                <CodeBlock code={SERVICE_GEN_CODE} />
            </Section>

            <Section title="Interactive multi-step generator">
                <div
                    className={css({
                        backgroundColor: '#1e1e1e',
                        borderRadius: '8px',
                        border: '1px solid #3b3b3b',
                        overflow: 'hidden',
                    })}
                >
                    <div className={css({ padding: '0.75rem 1rem', borderBottom: '1px solid #3b3b3b' })}>
                        <div className={css({ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' })}>
                            Three-step Effect.gen pipeline: step1(×3) → step2(guard &gt;100) → step3(wrap)
                        </div>
                        <div className={css({ display: 'flex', gap: '0.5rem' })}>
                            <input
                                value={inputNum}
                                onChange={(e) => setInputNum(e.target.value)}
                                type="number"
                                className={css({
                                    width: '100px',
                                    backgroundColor: '#2e2e2e',
                                    border: '1px solid #3b3b3b',
                                    borderRadius: '6px',
                                    padding: '0.4rem 0.75rem',
                                    color: 'white',
                                    fontSize: '0.85rem',
                                    fontFamily: 'monospace',
                                    outline: 'none',
                                    _focus: { borderColor: '#a78bfa' },
                                })}
                                placeholder="number"
                            />
                            <button
                                onClick={runDemo}
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
                                Run gen
                            </button>
                        </div>
                        <div
                            className={css({
                                marginTop: '0.4rem',
                                fontSize: '0.72rem',
                                color: 'rgba(255,255,255,0.35)',
                            })}
                        >
                            Try: 0 or negative (step1 fails) · 34+ (step2 fails, 34×3=102) · 10 (succeeds)
                        </div>
                    </div>
                    <div className={css({ padding: '0.75rem 1rem', minHeight: '80px' })}>
                        {logs.length === 0 ? (
                            <div className={css({ color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem' })}>
                                No run yet…
                            </div>
                        ) : (
                            <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.4rem' })}>
                                {logs.map((log, i) => (
                                    <div
                                        key={i}
                                        className={css({ display: 'flex', gap: '0.75rem', fontSize: '0.82rem', fontFamily: 'monospace' })}
                                    >
                                        <span className={css({ color: 'rgba(255,255,255,0.35)', minWidth: '110px' })}>{log.step}</span>
                                        <span style={{ color: log.ok ? '#93c5fd' : '#fca5a5' }}>{log.value}</span>
                                    </div>
                                ))}
                                {finalResult && (
                                    <div
                                        className={css({ marginTop: '0.3rem', paddingTop: '0.5rem', borderTop: '1px solid #3b3b3b', fontSize: '0.85rem', fontWeight: 'semibold', fontFamily: 'monospace' })}
                                        style={{ color: finalResult.startsWith('✅') ? '#86efac' : '#fca5a5' }}
                                    >
                                        {finalResult}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Section>
        </ChapterLayout>
    )
}
