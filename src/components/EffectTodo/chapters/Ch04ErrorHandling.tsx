import { css } from '@styled-system/css'
import { useState } from 'react'
import { Effect, Data, pipe } from 'effect'
import { ChapterLayout, Section } from '../shared/ChapterLayout'
import { Callout } from '../shared/Callout'
import { CodeBlock } from '../shared/CodeBlock'

// ─── Typed errors used in demos ───────────────────────────────────────────────

class ValidationError extends Data.TaggedError('ValidationError')<{
    readonly field: string
    readonly message: string
}> {}

class NotFoundError extends Data.TaggedError('NotFoundError')<{
    readonly id: string
}> {}

// ─── Code snippets ────────────────────────────────────────────────────────────

const TAGGED_ERROR_CODE = `import { Data } from 'effect'

// Data.TaggedError gives each error class a _tag discriminant
// This enables precise, type-safe catch blocks

class ValidationError extends Data.TaggedError("ValidationError")<{
    readonly field: string
    readonly message: string
}> {}

class NotFoundError extends Data.TaggedError("NotFoundError")<{
    readonly id: string
}> {}

// Usage:
Effect.fail(new ValidationError({ field: "title", message: "Required" }))
// Type: Effect<never, ValidationError, never>`

const CATCH_TAG_CODE = `import { Effect, pipe } from 'effect'

// Effect.catchTag — handle ONE specific error by _tag
const safe = pipe(
    findTodo("missing-id"),
    // Type so far: Effect<Todo, NotFoundError, TodoRepository>

    Effect.catchTag("NotFoundError", (e) =>
        Effect.succeed({ id: e.id, title: "Default Todo", done: false })
    ),
    // Now: Effect<Todo, never, TodoRepository>  ← error handled ✓
)`

const CATCH_ALL_CODE = `import { Effect, pipe } from 'effect'

// Effect.catchAll — catch ALL errors regardless of type
const safe = pipe(
    createTodo(""),
    // Type: Effect<Todo, ValidationError | NetworkError, ...>

    Effect.catchAll((e) => {
        if (e._tag === "ValidationError") {
            return Effect.succeed({ title: "Untitled", done: false })
        }
        return Effect.fail(e) // re-throw network errors
    })
)`

const MATCH_CODE = `import { Effect, pipe } from 'effect'

// Effect.match — pattern match on both branches, always succeeds
const message = pipe(
    findTodo("123"),

    Effect.match({
        onSuccess:  (todo) => \`Found: "\${todo.title}"\`,
        onFailure:  (e)    => \`Error [\${e._tag}]: \${e.id}\`,
    }),
    // Type: Effect<string, never, never>  ← guaranteed to succeed
)

// Use this at the edge of your app (event handlers, etc.)
// when you want to convert an Effect result to a plain string or value`

const ORDIE_CODE = `import { Effect, pipe } from 'effect'

// Effect.orDie — convert unexpected errors to defects (unrecoverable)
// Use for "this should never happen" invariants
const safe = pipe(
    dangerousOperation(),
    Effect.orDie, // any Error is now a defect, not a typed error
)

// Effect.orElse — provide a fallback effect on failure
const withFallback = pipe(
    fetchFromRemote("todos"),
    Effect.orElse(() => fetchFromCache("todos")),
)`

// ─── Interactive demo logic ────────────────────────────────────────────────────

const TODOS = [
    { id: '1', title: 'Learn Effect', done: true },
    { id: '2', title: 'Build a Todo app', done: false },
]

function findTodo(id: string): Effect.Effect<(typeof TODOS)[0], NotFoundError> {
    const todo = TODOS.find((t) => t.id === id)
    return todo ? Effect.succeed(todo) : Effect.fail(new NotFoundError({ id }))
}

function validateTitle(title: string): Effect.Effect<string, ValidationError> {
    return title.trim().length === 0
        ? Effect.fail(new ValidationError({ field: 'title', message: 'Title cannot be empty' }))
        : Effect.succeed(title.trim())
}

interface DemoResult {
    label: string
    tag: string
    message: string
    ok: boolean
}

export function Ch04ErrorHandling() {
    const [findId, setFindId] = useState('1')
    const [titleInput, setTitleInput] = useState('')
    const [findResult, setFindResult] = useState<DemoResult | null>(null)
    const [validateResult, setValidateResult] = useState<DemoResult | null>(null)

    function runFind() {
        const result = Effect.runSync(
            pipe(
                findTodo(findId),
                Effect.match({
                    onSuccess: (todo) => ({
                        ok: true,
                        tag: 'Success',
                        label: `Todo #${findId}`,
                        message: `"${todo.title}" — done: ${todo.done}`,
                    }),
                    onFailure: (e) => ({
                        ok: false,
                        tag: e._tag,
                        label: `Todo #${findId}`,
                        message: `No todo found with id "${e.id}"`,
                    }),
                })
            )
        )
        setFindResult(result)
    }

    function runValidate() {
        const result = Effect.runSync(
            pipe(
                validateTitle(titleInput),
                Effect.match({
                    onSuccess: (title) => ({
                        ok: true,
                        tag: 'Success',
                        label: `validateTitle("${titleInput}")`,
                        message: `Valid title: "${title}"`,
                    }),
                    onFailure: (e) => ({
                        ok: false,
                        tag: e._tag,
                        label: `validateTitle("${titleInput}")`,
                        message: `[${e.field}] ${e.message}`,
                    }),
                })
            )
        )
        setValidateResult(result)
    }

    return (
        <ChapterLayout
            number={4}
            title="Error Handling"
            subtitle="Effect's error handling is its superpower. Errors are typed, exhaustive, and composable — no more swallowing unknown exceptions."
        >
            <Section title="Typed errors with Data.TaggedError">
                <CodeBlock code={TAGGED_ERROR_CODE} />
                <Callout variant="concept" title="Why tagged errors?">
                    The <code>_tag</code> discriminant lets TypeScript narrow error types precisely.
                    Combined with Effect's union error system, you always know the exact set of things
                    that can go wrong in a pipeline — and the compiler enforces you handle them.
                </Callout>
            </Section>

            <Section title="Effect.catchTag — targeted recovery">
                <CodeBlock code={CATCH_TAG_CODE} />
                <Callout variant="tip" title="catchTag removes an error from the union">
                    After <code>catchTag("NotFoundError", ...)</code>, the <code>NotFoundError</code>{' '}
                    branch disappears from the type. If you had{' '}
                    <code>Effect&lt;A, NotFoundError | ValidationError, R&gt;</code>, after handling{' '}
                    NotFoundError you get{' '}
                    <code>Effect&lt;A, ValidationError, R&gt;</code>. The compiler tracks this.
                </Callout>
            </Section>

            <Section title="Effect.catchAll — catch everything">
                <CodeBlock code={CATCH_ALL_CODE} />
            </Section>

            <Section title="Effect.match — always succeed with a value">
                <CodeBlock code={MATCH_CODE} />
                <Callout variant="info" title="match is the safest boundary handler">
                    At the edge of your app (event handlers, React state updates), use{' '}
                    <code>Effect.match</code> to convert the Effect into a plain value. After{' '}
                    <code>match</code>, the error type becomes <code>never</code> — safe to{' '}
                    <code>runSync</code>.
                </Callout>
            </Section>

            <Section title="Other utilities">
                <CodeBlock code={ORDIE_CODE} />
            </Section>

            <Section title="Interactive demo — try the errors">
                <div
                    className={css({
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.75rem',
                    })}
                >
                    {/* Find Todo demo */}
                    <div
                        className={css({
                            backgroundColor: '#1e1e1e',
                            borderRadius: '8px',
                            border: '1px solid #3b3b3b',
                            overflow: 'hidden',
                        })}
                    >
                        <div className={css({ padding: '0.75rem 1rem', borderBottom: '1px solid #3b3b3b' })}>
                            <div className={css({ fontSize: '0.8rem', color: '#c4b5fd', marginBottom: '0.5rem', fontFamily: 'monospace' })}>
                                findTodo(id) — NotFoundError
                            </div>
                            <div className={css({ display: 'flex', gap: '0.5rem' })}>
                                <input
                                    value={findId}
                                    onChange={(e) => setFindId(e.target.value)}
                                    className={css({
                                        flex: 1,
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
                                    placeholder="Try: 1, 2, 99..."
                                />
                                <button
                                    onClick={runFind}
                                    className={css({
                                        padding: '0.4rem 0.9rem',
                                        backgroundColor: '#4c1d95',
                                        border: 'none',
                                        borderRadius: '6px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '0.82rem',
                                        _hover: { backgroundColor: '#5b21b6' },
                                    })}
                                >
                                    Run
                                </button>
                            </div>
                        </div>
                        <div className={css({ padding: '0.75rem 1rem', minHeight: '70px' })}>
                            {findResult && (
                                <ResultDisplay result={findResult} />
                            )}
                        </div>
                    </div>

                    {/* Validate title demo */}
                    <div
                        className={css({
                            backgroundColor: '#1e1e1e',
                            borderRadius: '8px',
                            border: '1px solid #3b3b3b',
                            overflow: 'hidden',
                        })}
                    >
                        <div className={css({ padding: '0.75rem 1rem', borderBottom: '1px solid #3b3b3b' })}>
                            <div className={css({ fontSize: '0.8rem', color: '#fcd34d', marginBottom: '0.5rem', fontFamily: 'monospace' })}>
                                validateTitle(text) — ValidationError
                            </div>
                            <div className={css({ display: 'flex', gap: '0.5rem' })}>
                                <input
                                    value={titleInput}
                                    onChange={(e) => setTitleInput(e.target.value)}
                                    className={css({
                                        flex: 1,
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
                                    placeholder="Try empty or whitespace..."
                                />
                                <button
                                    onClick={runValidate}
                                    className={css({
                                        padding: '0.4rem 0.9rem',
                                        backgroundColor: '#92400e',
                                        border: 'none',
                                        borderRadius: '6px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '0.82rem',
                                        _hover: { backgroundColor: '#b45309' },
                                    })}
                                >
                                    Run
                                </button>
                            </div>
                        </div>
                        <div className={css({ padding: '0.75rem 1rem', minHeight: '70px' })}>
                            {validateResult && (
                                <ResultDisplay result={validateResult} />
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className={css({
                        padding: '0.75rem 1rem',
                        backgroundColor: '#1e1e1e',
                        borderRadius: '8px',
                        border: '1px solid #3b3b3b',
                        fontSize: '0.8rem',
                        color: 'rgba(255,255,255,0.4)',
                    })}
                >
                    IDs that exist: <code className={css({ color: '#86efac' })}>1</code>,{' '}
                    <code className={css({ color: '#86efac' })}>2</code> — anything else triggers{' '}
                    <code className={css({ color: '#fca5a5' })}>NotFoundError</code>. An empty string or
                    whitespace-only title triggers{' '}
                    <code className={css({ color: '#fca5a5' })}>ValidationError</code>.
                </div>
            </Section>
        </ChapterLayout>
    )
}

interface ResultDisplayProps {
    result: DemoResult
}

function ResultDisplay({ result }: ResultDisplayProps) {
    return (
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontFamily: 'monospace', fontSize: '0.82rem' })}>
            <div className={css({ display: 'flex', gap: '0.5rem', alignItems: 'center' })}>
                <span
                    className={css({
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 'bold',
                    })}
                    style={{
                        backgroundColor: result.ok ? '#0d2318' : '#2d0d0d',
                        color: result.ok ? '#86efac' : '#fca5a5',
                        border: `1px solid ${result.ok ? '#16a34a' : '#dc2626'}`,
                    }}
                >
                    {result.tag}
                </span>
            </div>
            <div className={css({ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem' })}>{result.message}</div>
        </div>
    )
}
