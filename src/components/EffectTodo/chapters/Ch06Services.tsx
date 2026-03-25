import { css } from '@styled-system/css'
import { useState } from 'react'
import { Effect, Context, Layer, pipe } from 'effect'
import { ChapterLayout, Section } from '../shared/ChapterLayout'
import { Callout } from '../shared/Callout'
import { CodeBlock } from '../shared/CodeBlock'

// ─── Service definition (used in demo) ────────────────────────────────────────

interface CounterService {
    increment: (by?: number) => Effect.Effect<number>
    decrement: (by?: number) => Effect.Effect<number>
    reset: () => Effect.Effect<void>
    getCount: () => Effect.Effect<number>
}

class Counter extends Context.Tag('Counter')<Counter, CounterService>() {}

// In-memory implementation
function makeCounterLive(): CounterService {
    let count = 0
    return {
        increment: (by = 1) => Effect.sync(() => { count += by; return count }),
        decrement: (by = 1) => Effect.sync(() => { count -= by; return count }),
        reset: () => Effect.sync(() => { count = 0 }),
        getCount: () => Effect.sync(() => count),
    }
}

// Clamped implementation (count stays 0–10)
function makeCounterClamped(): CounterService {
    let count = 0
    return {
        increment: (by = 1) =>
            Effect.sync(() => {
                count = Math.min(10, count + by)
                return count
            }),
        decrement: (by = 1) =>
            Effect.sync(() => {
                count = Math.max(0, count - by)
                return count
            }),
        reset: () => Effect.sync(() => { count = 0 }),
        getCount: () => Effect.sync(() => count),
    }
}

const CounterLive = Layer.succeed(Counter, makeCounterLive())
const CounterClamped = Layer.succeed(Counter, makeCounterClamped())

// ─── Code snippets ────────────────────────────────────────────────────────────

const TAG_CODE = `import { Context } from 'effect'

// Context.Tag creates a unique identifier (and type) for a service
// The class-based syntax bundles the tag with its interface

interface CounterService {
    increment: (by?: number) => Effect.Effect<number>
    decrement: (by?: number) => Effect.Effect<number>
    getCount:  ()            => Effect.Effect<number>
    reset:     ()            => Effect.Effect<void>
}

class Counter extends Context.Tag("Counter")<
    Counter,         // ← the tag itself (used as identifier)
    CounterService   // ← the interface it provides
>() {}

// Now \`Counter\` serves dual purpose:
// 1. As a type:  Counter  (the tag)
// 2. As a value: yield* Counter  (retrieves the service in Effect.gen)`

const LAYER_CODE = `import { Layer, Effect } from 'effect'

// Layer.succeed — the simplest Layer: provide a hardcoded implementation
let count = 0

const CounterLive = Layer.succeed(Counter, {
    increment: (by = 1) => Effect.sync(() => { count += by; return count }),
    decrement: (by = 1) => Effect.sync(() => { count -= by; return count }),
    getCount:  ()       => Effect.sync(() => count),
    reset:     ()       => Effect.sync(() => { count = 0 }),
})

// Layers can also be built with effects (for async initialization):
const CounterFromDB = Layer.effect(
    Counter,
    Effect.gen(function* () {
        const db = yield* Database
        const initial = yield* db.query("SELECT count FROM counter")
        return makeCounterFromDB(initial)
    })
)`

const PROVIDE_CODE = `import { Effect, pipe } from 'effect'

// Effect.provide — injects a Layer into an Effect
// This eliminates the R type parameter (removes the requirement)

const program = Effect.gen(function* () {
    const counter = yield* Counter   // R = Counter here
    yield* counter.increment()
    return yield* counter.getCount()
})
// program: Effect<number, never, Counter>   ← needs Counter

const runnable = pipe(
    program,
    Effect.provide(CounterLive)
)
// runnable: Effect<number, never, never>    ← fully self-contained

const result = Effect.runSync(runnable)  // 1`

const SWAP_CODE = `// The same program can run against DIFFERENT implementations
// simply by swapping the Layer — the program code stays unchanged

const testLayer = Layer.succeed(Counter, {
    increment: () => Effect.succeed(0),  // no-op for tests
    decrement: () => Effect.succeed(0),
    getCount:  () => Effect.succeed(42), // predictable test value
    reset:     () => Effect.succeed(undefined),
})

// Production:
pipe(program, Effect.provide(CounterLive))

// Test:
pipe(program, Effect.provide(testLayer))

// This is dependency injection without a container — just types and values.`

export function Ch06Services() {
    const [impl, setImpl] = useState<'live' | 'clamped'>('live')
    const [count, setCount] = useState<number>(0)
    const [log, setLog] = useState<string[]>([])

    const activeLayer = impl === 'live' ? CounterLive : CounterClamped

    function runEffect(effect: Effect.Effect<number | void, never, Counter>, label: string) {
        const result = Effect.runSync(
            pipe(
                effect,
                Effect.flatMap(() =>
                    pipe(
                        Counter,
                        Effect.flatMap((c) => c.getCount())
                    )
                ),
                Effect.provide(activeLayer)
            )
        )
        setCount(result)
        setLog((prev) => [`${label} → count = ${result}`, ...prev.slice(0, 6)])
    }

    function runReset() {
        Effect.runSync(
            pipe(
                Counter,
                Effect.flatMap((c) => c.reset()),
                Effect.provide(activeLayer)
            )
        )
        setCount(0)
        setLog((prev) => ['reset() → count = 0', ...prev.slice(0, 6)])
    }

    return (
        <ChapterLayout
            number={6}
            title="Services & Layers"
            subtitle="Services declare what an effect needs. Layers provide how those needs are fulfilled. This is Effect's built-in dependency injection system."
        >
            <Section title="Context.Tag — naming a service">
                <CodeBlock code={TAG_CODE} />
                <Callout variant="concept" title="Tags are the contract, Layers are the implementation">
                    A <code>Context.Tag</code> defines <em>what</em> a service looks like —{' '}
                    its interface. It asks: "I need something that can increment and decrement."
                    The <code>Layer</code> answers: "Here's how."
                </Callout>
            </Section>

            <Section title="Layer.succeed — providing an implementation">
                <CodeBlock code={LAYER_CODE} />
                <Callout variant="tip" title="Layers compose">
                    Layers can depend on other layers, merge with <code>Layer.merge</code>, and be
                    provided partially. A complex app might compose dozens of layers into a single
                    root layer provided once at startup.
                </Callout>
            </Section>

            <Section title="Effect.provide — eliminating the requirement">
                <CodeBlock code={PROVIDE_CODE} />
                <Callout variant="info" title="R becomes never when fully provided">
                    After <code>Effect.provide(CounterLive)</code>, the <code>Counter</code> requirement
                    is removed from the type. TypeScript enforces that you cannot{' '}
                    <code>runSync</code> an effect with unsatisfied requirements.
                </Callout>
            </Section>

            <Section title="Swapping implementations">
                <CodeBlock code={SWAP_CODE} />
            </Section>

            <Section title="Interactive — swap the Layer at runtime">
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
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            flexWrap: 'wrap',
                        })}
                    >
                        <span className={css({ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' })}>
                            Active Layer:
                        </span>
                        {(['live', 'clamped'] as const).map((v) => (
                            <button
                                key={v}
                                onClick={() => { setImpl(v); setCount(0); setLog([]) }}
                                className={css({
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '6px',
                                    border: '1px solid',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    fontFamily: 'monospace',
                                    transition: 'all 0.15s',
                                })}
                                style={{
                                    backgroundColor: impl === v ? '#1e0d37' : 'transparent',
                                    borderColor: impl === v ? '#7c3aed' : '#3b3b3b',
                                    color: impl === v ? '#c4b5fd' : 'rgba(255,255,255,0.45)',
                                }}
                            >
                                {v === 'live' ? 'CounterLive (unbounded)' : 'CounterClamped (0–10)'}
                            </button>
                        ))}
                    </div>
                    <div
                        className={css({
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1px',
                            backgroundColor: '#3b3b3b',
                        })}
                    >
                        <div className={css({ backgroundColor: '#1e1e1e', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' })}>
                            <div
                                className={css({
                                    fontSize: '3rem',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: '#c4b5fd',
                                    fontVariantNumeric: 'tabular-nums',
                                    lineHeight: '1',
                                })}
                            >
                                {count}
                            </div>
                            <div className={css({ display: 'flex', gap: '0.5rem', justifyContent: 'center' })}>
                                {[
                                    {
                                        label: '−1',
                                        color: '#fca5a5',
                                        bg: '#2d0d0d',
                                        run: () =>
                                            runEffect(
                                                pipe(Counter, Effect.flatMap((c) => c.decrement())),
                                                'decrement(1)'
                                            ),
                                    },
                                    {
                                        label: '+1',
                                        color: '#86efac',
                                        bg: '#0d2318',
                                        run: () =>
                                            runEffect(
                                                pipe(Counter, Effect.flatMap((c) => c.increment())),
                                                'increment(1)'
                                            ),
                                    },
                                    {
                                        label: '+5',
                                        color: '#93c5fd',
                                        bg: '#0d2137',
                                        run: () =>
                                            runEffect(
                                                pipe(Counter, Effect.flatMap((c) => c.increment(5))),
                                                'increment(5)'
                                            ),
                                    },
                                    {
                                        label: 'reset',
                                        color: 'rgba(255,255,255,0.5)',
                                        bg: '#2e2e2e',
                                        run: runReset,
                                    },
                                ].map(({ label, color, bg, run }) => (
                                    <button
                                        key={label}
                                        onClick={run}
                                        className={css({
                                            padding: '0.4rem 0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid #3b3b3b',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            fontFamily: 'monospace',
                                            transition: 'opacity 0.15s',
                                            _hover: { opacity: 0.8 },
                                        })}
                                        style={{ backgroundColor: bg, color }}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={css({ backgroundColor: '#161b22', padding: '0.75rem 1rem' })}>
                            <div className={css({ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.5rem' })}>
                                Call log
                            </div>
                            {log.length === 0 ? (
                                <div className={css({ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' })}>No calls yet…</div>
                            ) : (
                                <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.3rem' })}>
                                    {log.map((l, i) => (
                                        <div key={i} className={css({ fontSize: '0.8rem', fontFamily: 'monospace', color: i === 0 ? '#c4b5fd' : 'rgba(255,255,255,0.45)' })}>
                                            {l}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={css({ padding: '0.6rem 1rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', borderTop: '1px solid #3b3b3b' })}>
                        Switch to <strong>CounterClamped</strong> and watch +5 get clamped at 10. The program code is identical — only the Layer changes.
                    </div>
                </div>
            </Section>
        </ChapterLayout>
    )
}
