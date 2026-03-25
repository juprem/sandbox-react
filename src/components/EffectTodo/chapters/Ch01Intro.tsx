import { css } from '@styled-system/css'
import { ChapterLayout, Section } from '../shared/ChapterLayout'
import { Callout } from '../shared/Callout'
import { CodeBlock } from '../shared/CodeBlock'

const TYPE_SIGNATURE_CODE = `// Effect<A, E, R>
//         │  │  └── Requirements  (services the effect needs)
//         │  └───── Error type    (what can go wrong — typed!)
//         └──────── Success type  (what you get on success)

// A few examples:
const fetchUser: Effect<User, HttpError, HttpClient>
const parseDate: Effect<Date, ParseError, never>
const getRandomNumber: Effect<number, never, never>
// "never" means: no error possible / no services needed`

const PROMISE_VS_EFFECT_CODE = `// ─── Promise ────────────────────────────────────────────────
const promise = fetch("/api/user/1")   // executes immediately!
//  errors: unknown, untyped
//  dependencies: implicit (global fetch)
//  composition: hard (try/catch nesting)

// ─── Effect ─────────────────────────────────────────────────
const effect = Http.get("/api/user/1") // just a description
//  errors: typed (HttpError | NotFoundError)
//  dependencies: explicit (HttpClient service)
//  composition: pipe-friendly, lazy, reusable`

const LAZY_CODE = `import { Effect } from 'effect'

// This does NOTHING yet — it's a description
const greet = Effect.sync(() => {
    console.log("Hello!")
    return "Hello!"
})

// Nothing logged yet...

// THIS runs it:
Effect.runSync(greet)
// Now "Hello!" is logged`

export function Ch01Intro() {
    return (
        <ChapterLayout
            number={1}
            title="What is Effect?"
            subtitle="Effect is a TypeScript library for writing programs that are correct, composable, and explicit about failures and dependencies — without sacrificing readability."
        >
            <Section title="The core idea">
                <Callout variant="concept" title="A blueprint, not an execution">
                    An <strong>Effect</strong> is a <em>lazy description</em> of a computation. Creating an Effect
                    does nothing. You explicitly run it when you are ready. This small distinction unlocks
                    enormous composability.
                </Callout>
                <p
                    className={css({
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: '1.75',
                        fontSize: '0.92rem',
                        margin: '0',
                    })}
                >
                    Think of an Effect like a recipe — it describes ingredients and steps, but the meal only
                    gets cooked when you explicitly start cooking. You can combine recipes, modify them, and
                    share them before a single pot hits the stove.
                </p>
            </Section>

            <Section title="The type signature">
                <p
                    className={css({
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: '1.75',
                        fontSize: '0.92rem',
                        margin: '0',
                    })}
                >
                    Every Effect carries three type parameters. Unlike Promise which hides errors in{' '}
                    <code
                        className={css({
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            padding: '1px 5px',
                            borderRadius: '4px',
                            fontSize: '0.83rem',
                        })}
                    >
                        unknown
                    </code>
                    , Effect makes failures a first-class typed citizen.
                </p>
                <CodeBlock code={TYPE_SIGNATURE_CODE} />
                <div
                    className={css({
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0.75rem',
                    })}
                >
                    {[
                        {
                            label: 'A — Success',
                            color: '#86efac',
                            bg: '#0d2318',
                            desc: 'The value you get when everything works.',
                        },
                        {
                            label: 'E — Error',
                            color: '#fca5a5',
                            bg: '#2d0d0d',
                            desc: 'A union of all typed errors this effect can fail with.',
                        },
                        {
                            label: 'R — Requirements',
                            color: '#c4b5fd',
                            bg: '#1e0d37',
                            desc: 'Services this effect needs to run (injected via Layers).',
                        },
                    ].map(({ label, color, bg, desc }) => (
                        <div
                            key={label}
                            className={css({ padding: '0.9rem', borderRadius: '8px', border: '1px solid #3b3b3b' })}
                            style={{ backgroundColor: bg }}
                        >
                            <div
                                className={css({ fontWeight: 'bold', fontSize: '0.88rem', marginBottom: '0.3rem' })}
                                style={{ color }}
                            >
                                {label}
                            </div>
                            <div className={css({ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' })}>
                                {desc}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Promise vs Effect">
                <CodeBlock code={PROMISE_VS_EFFECT_CODE} />
                <Callout variant="info" title="The key differences">
                    <ul className={css({ margin: '0', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' })}>
                        <li><strong>Typed errors</strong> — no more silent <code>catch (e: unknown)</code></li>
                        <li><strong>Lazy</strong> — effects are values; they only run when you call <code>runSync</code> / <code>runPromise</code></li>
                        <li><strong>Dependency injection built-in</strong> — services declared in <code>R</code>, provided via Layers</li>
                        <li><strong>Composable</strong> — combine, transform, and sequence with <code>pipe</code> and <code>Effect.gen</code></li>
                    </ul>
                </Callout>
            </Section>

            <Section title="Laziness in action">
                <CodeBlock code={LAZY_CODE} />
                <Callout variant="tip" title="Nothing runs until you say so">
                    This lazy model means you can build complex pipelines, tests, and dependency graphs
                    without side effects firing prematurely. You always stay in control of when execution happens.
                </Callout>
            </Section>

            <Section title="What you will build">
                <div
                    className={css({
                        padding: '1.25rem',
                        borderRadius: '8px',
                        backgroundColor: '#1e1e1e',
                        border: '1px solid #3b3b3b',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.6rem',
                    })}
                >
                    <div className={css({ fontWeight: 'semibold', fontSize: '0.9rem', marginBottom: '0.25rem', color: '#a78bfa' })}>
                        Course roadmap — Todo App
                    </div>
                    {[
                        { ch: '02', label: 'Basic Effects', desc: 'succeed, fail, sync, runSync, runPromise' },
                        { ch: '03', label: 'Pipelines', desc: 'pipe, map, flatMap, tap' },
                        { ch: '04', label: 'Error Handling', desc: 'Tagged errors, catchTag, match' },
                        { ch: '05', label: 'Effect.gen', desc: 'Generator syntax — async/await for Effect' },
                        { ch: '06', label: 'Services & Layers', desc: 'Context.Tag, Layer, provide' },
                        { ch: '07', label: 'Full Todo App', desc: 'Everything wired together in a real UI' },
                    ].map(({ ch, label, desc }) => (
                        <div
                            key={ch}
                            className={css({ display: 'flex', gap: '0.75rem', alignItems: 'baseline' })}
                        >
                            <span
                                className={css({
                                    fontSize: '0.7rem',
                                    color: 'rgba(167,139,250,0.5)',
                                    minWidth: '28px',
                                    fontVariantNumeric: 'tabular-nums',
                                })}
                            >
                                {ch}
                            </span>
                            <span className={css({ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', minWidth: '140px' })}>
                                {label}
                            </span>
                            <span className={css({ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' })}>{desc}</span>
                        </div>
                    ))}
                </div>
            </Section>
        </ChapterLayout>
    )
}
