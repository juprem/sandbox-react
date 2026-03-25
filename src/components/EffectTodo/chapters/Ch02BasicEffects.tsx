import { css } from '@styled-system/css'
import { useState } from 'react'
import { Effect, pipe } from 'effect'
import { ChapterLayout, Section } from '../shared/ChapterLayout'
import { Callout } from '../shared/Callout'
import { CodeBlock } from '../shared/CodeBlock'

const SUCCEED_CODE = `import { Effect } from 'effect'

// Effect.succeed — wraps a known value
const answer = Effect.succeed(42)
// Type: Effect<number, never, never>
//  A = number  ✓
//  E = never   (cannot fail)
//  R = never   (no dependencies)

const greeting = Effect.succeed({ message: "Hello!" })
// Type: Effect<{ message: string }, never, never>`

const FAIL_CODE = `import { Effect } from 'effect'

// Effect.fail — wraps an error value
const boom = Effect.fail(new Error("Something went wrong"))
// Type: Effect<never, Error, never>
//  A = never   (never succeeds)
//  E = Error   ✓

// You can fail with ANY value, not just Error objects:
const coded = Effect.fail({ code: 404, message: "Not found" })
// Type: Effect<never, { code: number; message: string }, never>`

const SYNC_CODE = `import { Effect } from 'effect'

// Effect.sync — wraps a SYNCHRONOUS side-effectful computation
// The thunk runs lazily — only when the effect is executed
const now = Effect.sync(() => Date.now())
// Type: Effect<number, never, never>

const random = Effect.sync(() => Math.random())
// Type: Effect<number, never, never>

// Effect.sync guarantees the thunk will not throw.
// Use Effect.try if your thunk can throw:`

const TRY_CODE = `import { Effect } from 'effect'

// Effect.try — like sync but catches thrown errors
const parsed = Effect.try({
    try: () => JSON.parse('{ "ok": true }'),
    catch: (e) => new Error(\`Parse failed: \${e}\`),
})
// Type: Effect<unknown, Error, never>

const broken = Effect.try({
    try: () => JSON.parse('NOT JSON'),
    catch: (e) => new Error(\`Parse failed: \${e}\`),
})
// Running this → fails with Error("Parse failed: ...")`

const RUN_CODE = `import { Effect } from 'effect'

// Effect.runSync — runs synchronously, returns the value or throws
const result = Effect.runSync(Effect.succeed(42))
console.log(result) // 42

// Effect.runPromise — runs as a Promise
const result2 = await Effect.runPromise(Effect.succeed("hello"))
console.log(result2) // "hello"

// IMPORTANT: runSync throws if the effect fails
// Use Effect.runSyncExit to get an Exit value instead:
const exit = Effect.runSyncExit(Effect.fail("oops"))
// exit._tag === "Failure"`

function safeRun<A>(effect: Effect.Effect<A, any, never>): string {
    return Effect.runSync(
        pipe(
            effect,
            Effect.match({
                onSuccess: (v) => `✅ Success: ${JSON.stringify(v)}`,
                onFailure: (e) => `❌ Failure: ${e instanceof Error ? e.message : JSON.stringify(e)}`,
            })
        )
    )
}

interface DemoResult {
    label: string
    result: string
}

export function Ch02BasicEffects() {
    const [results, setResults] = useState<DemoResult[]>([])

    function addResult(label: string, result: string) {
        setResults((prev) => [{ label, result }, ...prev.slice(0, 4)])
    }

    const demos = [
        {
            label: 'Effect.succeed(42)',
            color: '#86efac',
            run: () => safeRun(Effect.succeed(42)),
        },
        {
            label: 'Effect.succeed("hello")',
            color: '#86efac',
            run: () => safeRun(Effect.succeed('hello')),
        },
        {
            label: 'Effect.fail(new Error("boom"))',
            color: '#fca5a5',
            run: () => safeRun(Effect.fail(new Error('boom'))),
        },
        {
            label: 'Effect.fail({ code: 404 })',
            color: '#fca5a5',
            run: () => safeRun(Effect.fail({ code: 404 })),
        },
        {
            label: 'Effect.sync(() => Math.random())',
            color: '#93c5fd',
            run: () => safeRun(Effect.sync(() => Math.random())),
        },
        {
            label: 'Effect.try — valid JSON',
            color: '#86efac',
            run: () =>
                safeRun(
                    Effect.try({
                        try: () => JSON.parse('{ "ok": true }'),
                        catch: (e) => new Error(`Parse failed: ${e}`),
                    })
                ),
        },
        {
            label: 'Effect.try — invalid JSON',
            color: '#fca5a5',
            run: () =>
                safeRun(
                    Effect.try({
                        try: () => JSON.parse('NOT JSON'),
                        catch: (e) => new Error(`Parse failed: ${e}`),
                    })
                ),
        },
    ]

    return (
        <ChapterLayout
            number={2}
            title="Basic Effects"
            subtitle="Learn the four primitive constructors — succeed, fail, sync, try — and how to actually execute Effects with runSync and runPromise."
        >
            <Section title="Effect.succeed">
                <CodeBlock code={SUCCEED_CODE} />
                <Callout variant="tip" title="succeed is the simplest Effect">
                    Use it to lift a pure, already-known value into the Effect world so it can participate
                    in pipelines alongside effects that might fail or need services.
                </Callout>
            </Section>

            <Section title="Effect.fail">
                <CodeBlock code={FAIL_CODE} />
                <Callout variant="info" title="Fail with any value">
                    Unlike Promise rejection which types the error as <code>unknown</code>, Effect preserves
                    the exact error type. This lets TypeScript verify you handle all error cases.
                </Callout>
            </Section>

            <Section title="Effect.sync &amp; Effect.try">
                <CodeBlock code={SYNC_CODE} />
                <CodeBlock code={TRY_CODE} />
                <Callout variant="warning" title="sync vs try">
                    Use <strong>Effect.sync</strong> when you are certain the thunk cannot throw.
                    Use <strong>Effect.try</strong> when it might — it catches the exception and maps it to
                    a typed error.
                </Callout>
            </Section>

            <Section title="Running Effects">
                <CodeBlock code={RUN_CODE} />
                <Callout variant="concept" title="The interpreter boundary">
                    All Effect code lives in a pure, lazy world. <code>runSync</code> and{' '}
                    <code>runPromise</code> are the "interpreter" — the single place where the description
                    meets reality. Keep run calls at the edges of your application (event handlers, route
                    loaders, etc.).
                </Callout>
            </Section>

            <Section title="Interactive playground">
                <div
                    className={css({
                        backgroundColor: '#1e1e1e',
                        borderRadius: '8px',
                        border: '1px solid #3b3b3b',
                        overflow: 'hidden',
                    })}
                >
                    <div
                        className={css({
                            padding: '0.75rem 1rem',
                            borderBottom: '1px solid #3b3b3b',
                            fontSize: '0.8rem',
                            color: 'rgba(255,255,255,0.45)',
                        })}
                    >
                        Click any button to run the Effect and see the result
                    </div>
                    <div
                        className={css({
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            padding: '0.75rem 1rem',
                            borderBottom: '1px solid #3b3b3b',
                        })}
                    >
                        {demos.map(({ label, color, run }) => (
                            <button
                                key={label}
                                onClick={() => addResult(label, run())}
                                className={css({
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '6px',
                                    border: '1px solid #3b3b3b',
                                    backgroundColor: '#2e2e2e',
                                    cursor: 'pointer',
                                    fontSize: '0.78rem',
                                    fontFamily: 'monospace',
                                    transition: 'border-color 0.15s',
                                    _hover: { borderColor: '#6b7280' },
                                })}
                                style={{ color }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <div className={css({ padding: '0.75rem 1rem', minHeight: '80px' })}>
                        {results.length === 0 ? (
                            <div className={css({ color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem' })}>
                                No results yet…
                            </div>
                        ) : (
                            <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.4rem' })}>
                                {results.map((r, i) => (
                                    <div
                                        key={i}
                                        className={css({ display: 'flex', gap: '1rem', fontSize: '0.82rem', fontFamily: 'monospace' })}
                                    >
                                        <span className={css({ color: 'rgba(255,255,255,0.35)', minWidth: '220px' })}>
                                            {r.label}
                                        </span>
                                        <span
                                            className={css({
                                                color: r.result.startsWith('✅') ? '#86efac' : '#fca5a5',
                                            })}
                                        >
                                            {r.result}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Section>
        </ChapterLayout>
    )
}
