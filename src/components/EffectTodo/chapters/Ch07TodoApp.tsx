import { css } from '@styled-system/css'
import { useState } from 'react'
import { Effect, Context, Layer, Data, pipe } from 'effect'
import { Check, Trash2, Plus, RefreshCw } from 'lucide-react'
import { ChapterLayout, Section } from '../shared/ChapterLayout'
import { Callout } from '../shared/Callout'
import { CodeBlock } from '../shared/CodeBlock'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Domain ───────────────────────────────────────────────────────────────────

interface Todo {
    id: string
    title: string
    done: boolean
}

// ─── Typed errors ─────────────────────────────────────────────────────────────

class ValidationError extends Data.TaggedError('ValidationError')<{
    readonly field: string
    readonly message: string
}> {}

class NotFoundError extends Data.TaggedError('NotFoundError')<{
    readonly id: string
}> {}

// ─── Service ──────────────────────────────────────────────────────────────────

interface TodoRepositoryService {
    getAll: () => Effect.Effect<Todo[]>
    add: (title: string) => Effect.Effect<Todo, ValidationError>
    toggle: (id: string) => Effect.Effect<Todo, NotFoundError>
    remove: (id: string) => Effect.Effect<void, NotFoundError>
}

class TodoRepository extends Context.Tag('TodoRepository')<
    TodoRepository,
    TodoRepositoryService
>() {}

// ─── In-memory implementation ─────────────────────────────────────────────────

function makeTodoRepositoryLive(): TodoRepositoryService {
    const todos: Todo[] = [
        { id: '1', title: 'Learn Effect basics', done: true },
        { id: '2', title: 'Understand typed errors', done: true },
        { id: '3', title: 'Build a Todo app', done: false },
    ]
    let nextId = 4

    return {
        getAll: () => Effect.succeed([...todos]),

        add: (title: string) => {
            if (title.trim().length === 0) {
                return Effect.fail(
                    new ValidationError({ field: 'title', message: 'Title cannot be empty' })
                )
            }
            return Effect.sync(() => {
                const todo: Todo = { id: String(nextId++), title: title.trim(), done: false }
                todos.push(todo)
                return todo
            })
        },

        toggle: (id: string) => {
            const todo = todos.find((t) => t.id === id)
            if (!todo) return Effect.fail(new NotFoundError({ id }))
            return Effect.sync(() => {
                todo.done = !todo.done
                return { ...todo }
            })
        },

        remove: (id: string) => {
            const idx = todos.findIndex((t) => t.id === id)
            if (idx === -1) return Effect.fail(new NotFoundError({ id }))
            return Effect.sync(() => { todos.splice(idx, 1) })
        },
    }
}

const TodoRepositoryLive = Layer.succeed(TodoRepository, makeTodoRepositoryLive())

// ─── Effect programs ──────────────────────────────────────────────────────────

const getAllTodos = pipe(
    TodoRepository,
    Effect.flatMap((repo) => repo.getAll())
)

function addTodo(title: string) {
    return Effect.gen(function* () {
        const repo = yield* TodoRepository
        const todo = yield* repo.add(title)
        return todo
    })
}

function toggleTodo(id: string) {
    return Effect.gen(function* () {
        const repo = yield* TodoRepository
        return yield* repo.toggle(id)
    })
}

function removeTodo(id: string) {
    return Effect.gen(function* () {
        const repo = yield* TodoRepository
        yield* repo.remove(id)
    })
}

// ─── Code snippets ────────────────────────────────────────────────────────────

const ARCHITECTURE_CODE = `// This app is structured in 4 layers:
//
//  ┌─────────────────────────────────────┐
//  │  React UI  (event handlers)         │
//  │  calls runSync(pipe(effect, layer)) │
//  ├─────────────────────────────────────┤
//  │  Effect programs                    │
//  │  addTodo, toggleTodo, removeTodo    │
//  │  return Effect<A, E, TodoRepository>│
//  ├─────────────────────────────────────┤
//  │  TodoRepository service (interface) │
//  │  Context.Tag — the contract         │
//  ├─────────────────────────────────────┤
//  │  TodoRepositoryLive (Layer)         │
//  │  in-memory implementation           │
//  └─────────────────────────────────────┘`

const ADD_PROGRAM_CODE = `// addTodo: the Effect program (no knowledge of implementation)
function addTodo(title: string) {
    return Effect.gen(function* () {
        const repo = yield* TodoRepository     // inject service
        const todo = yield* repo.add(title)    // may fail: ValidationError
        return todo
    })
    // Type: Effect<Todo, ValidationError, TodoRepository>
}

// React event handler — the only place we call runSync
function handleAdd() {
    const result = Effect.runSync(
        pipe(
            addTodo(inputValue),
            Effect.provide(TodoRepositoryLive),   // satisfy requirement
            Effect.match({
                onSuccess: (todo) => ({ ok: true, todo }),
                onFailure: (e)    => ({ ok: false, error: e.message }),
            })
        )
    )
    if (result.ok) setTodos(...)
    else setError(result.error)
}`

// ─── React component ──────────────────────────────────────────────────────────

function run<A, E>(effect: Effect.Effect<A, E, TodoRepository>) {
    return Effect.runSync(
        pipe(
            effect,
            Effect.provide(TodoRepositoryLive),
            Effect.match({
                onSuccess: (value) => ({ ok: true as const, value }),
                onFailure: (error) => ({ ok: false as const, error }),
            })
        )
    )
}

export function Ch07TodoApp() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const r = run(getAllTodos)
        return r.ok ? r.value : []
    })
    const [input, setInput] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [lastOp, setLastOp] = useState<string | null>(null)

    function refresh() {
        const r = run(getAllTodos)
        if (r.ok) setTodos(r.value)
    }

    function handleAdd() {
        setError(null)
        const r = run(addTodo(input))
        if (r.ok) {
            setInput('')
            setLastOp(`✅ add("${r.value.title}") → id=${r.value.id}`)
            refresh()
        } else {
            const err = r.error as ValidationError
            setError(`[${err._tag}] ${err.message}`)
            setLastOp(`❌ add("${input}") → ValidationError`)
        }
    }

    function handleToggle(id: string) {
        setError(null)
        const r = run(toggleTodo(id))
        if (r.ok) {
            setLastOp(`✅ toggle(${id}) → done=${r.value.done}`)
            refresh()
        } else {
            const err = r.error as NotFoundError
            setLastOp(`❌ toggle(${id}) → NotFoundError`)
            setError(`[${err._tag}] id="${err.id}" not found`)
        }
    }

    function handleRemove(id: string, title: string) {
        setError(null)
        const r = run(removeTodo(id))
        if (r.ok) {
            setLastOp(`✅ remove(${id}) → "${title}" deleted`)
            refresh()
        } else {
            const err = r.error as NotFoundError
            setLastOp(`❌ remove(${id}) → NotFoundError`)
            setError(`[${err._tag}] id="${err.id}" not found`)
        }
    }

    const doneCount = todos.filter((t) => t.done).length

    return (
        <ChapterLayout
            number={7}
            title="Full Todo App"
            subtitle="Everything from chapters 1–6 assembled into a working application: typed errors, services, layers, Effect.gen, and a clean React integration boundary."
        >
            <Section title="Architecture overview">
                <CodeBlock code={ARCHITECTURE_CODE} />
                <Callout variant="concept" title="The golden rule: Effects at the boundary">
                    All business logic lives in Effect programs. React only calls{' '}
                    <code>runSync</code> inside event handlers — the single boundary where the lazy
                    Effect world meets the imperative UI world.
                </Callout>
            </Section>

            <Section title="addTodo program">
                <CodeBlock code={ADD_PROGRAM_CODE} />
            </Section>

            <Section title="Live demo">
                <div
                    className={css({
                        backgroundColor: '#1e1e1e',
                        borderRadius: '10px',
                        border: '1px solid #3b3b3b',
                        overflow: 'hidden',
                        maxWidth: '520px',
                    })}
                >
                    {/* Header */}
                    <div
                        className={css({
                            padding: '1rem 1.25rem',
                            borderBottom: '1px solid #3b3b3b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        })}
                    >
                        <div>
                            <div className={css({ fontWeight: 'semibold', fontSize: '0.95rem' })}>Todo App</div>
                            <div className={css({ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '1px' })}>
                                {doneCount}/{todos.length} completed · powered by Effect
                            </div>
                        </div>
                        <button
                            onClick={refresh}
                            className={css({
                                padding: '0.3rem',
                                backgroundColor: 'transparent',
                                border: '1px solid #3b3b3b',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                color: 'rgba(255,255,255,0.4)',
                                _hover: { color: 'white', borderColor: '#6b7280' },
                            })}
                        >
                            <RefreshCw size={14} />
                        </button>
                    </div>

                    {/* Add form */}
                    <div className={css({ padding: '0.75rem 1.25rem', borderBottom: '1px solid #3b3b3b' })}>
                        <div className={css({ display: 'flex', gap: '0.5rem' })}>
                            <input
                                value={input}
                                onChange={(e) => { setInput(e.target.value); setError(null) }}
                                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                                placeholder="New todo… (press Enter)"
                                className={css({
                                    flex: 1,
                                    backgroundColor: '#2e2e2e',
                                    border: '1px solid',
                                    borderRadius: '6px',
                                    padding: '0.4rem 0.75rem',
                                    color: 'white',
                                    fontSize: '0.85rem',
                                    outline: 'none',
                                    transition: 'border-color 0.15s',
                                    _focus: { borderColor: '#7c3aed' },
                                    _placeholder: { color: 'rgba(255,255,255,0.2)' },
                                })}
                                style={{ borderColor: error ? '#dc2626' : '#3b3b3b' }}
                            />
                            <button
                                onClick={handleAdd}
                                className={css({
                                    padding: '0.4rem 0.75rem',
                                    backgroundColor: '#7c3aed',
                                    border: 'none',
                                    borderRadius: '6px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    fontSize: '0.82rem',
                                    _hover: { backgroundColor: '#6d28d9' },
                                })}
                            >
                                <Plus size={14} />
                                Add
                            </button>
                        </div>
                        {error && (
                            <div
                                className={css({
                                    marginTop: '0.4rem',
                                    fontSize: '0.78rem',
                                    fontFamily: 'monospace',
                                    color: '#fca5a5',
                                })}
                            >
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Todo list */}
                    <div className={css({ padding: '0.5rem 0' })}>
                        <AnimatePresence initial={false}>
                            {todos.length === 0 ? (
                                <div
                                    className={css({
                                        padding: '1.5rem',
                                        textAlign: 'center',
                                        color: 'rgba(255,255,255,0.2)',
                                        fontSize: '0.85rem',
                                    })}
                                >
                                    No todos yet
                                </div>
                            ) : (
                                todos.map((todo) => (
                                    <motion.div
                                        key={todo.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        <TodoItemRow
                                            todo={todo}
                                            onToggle={() => handleToggle(todo.id)}
                                            onRemove={() => handleRemove(todo.id, todo.title)}
                                        />
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Operation log */}
                    {lastOp && (
                        <div
                            className={css({
                                padding: '0.5rem 1.25rem',
                                borderTop: '1px solid #3b3b3b',
                                fontSize: '0.75rem',
                                fontFamily: 'monospace',
                                color: 'rgba(255,255,255,0.35)',
                            })}
                        >
                            Last op: {lastOp}
                        </div>
                    )}
                </div>
            </Section>

            <Section title="Recap — what you learned">
                <div
                    className={css({
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.6rem',
                    })}
                >
                    {[
                        { tag: 'Ch01', label: 'Effect<A,E,R>', desc: 'The three-parameter blueprint' },
                        { tag: 'Ch02', label: 'succeed / fail / sync', desc: 'Primitive constructors' },
                        { tag: 'Ch03', label: 'pipe + map + flatMap', desc: 'Composing pipelines' },
                        { tag: 'Ch04', label: 'Data.TaggedError', desc: 'Typed, discriminated errors' },
                        { tag: 'Ch05', label: 'Effect.gen', desc: 'Async/await style syntax' },
                        { tag: 'Ch06', label: 'Context.Tag + Layer', desc: 'Dependency injection' },
                    ].map(({ tag, label, desc }) => (
                        <div
                            key={tag}
                            className={css({
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid #3b3b3b',
                                backgroundColor: '#161b22',
                                display: 'flex',
                                gap: '0.6rem',
                                alignItems: 'flex-start',
                            })}
                        >
                            <span
                                className={css({
                                    fontSize: '0.65rem',
                                    color: '#a78bfa',
                                    minWidth: '28px',
                                    paddingTop: '2px',
                                })}
                            >
                                {tag}
                            </span>
                            <div>
                                <div
                                    className={css({
                                        fontSize: '0.82rem',
                                        fontFamily: 'monospace',
                                        color: '#c4b5fd',
                                        marginBottom: '0.15rem',
                                    })}
                                >
                                    {label}
                                </div>
                                <div className={css({ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' })}>{desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </ChapterLayout>
    )
}

// ─── Sub-component ────────────────────────────────────────────────────────────

interface TodoItemRowProps {
    todo: Todo
    onToggle: () => void
    onRemove: () => void
}

function TodoItemRow({ todo, onToggle, onRemove }: TodoItemRowProps) {
    return (
        <div
            className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.55rem 1.25rem',
                transition: 'background 0.12s',
                _hover: { backgroundColor: 'rgba(255,255,255,0.03)' },
            })}
        >
            <button
                onClick={onToggle}
                className={css({
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: '2px solid',
                    flexShrink: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s',
                    backgroundColor: 'transparent',
                })}
                style={{
                    borderColor: todo.done ? '#7c3aed' : '#4b5563',
                    backgroundColor: todo.done ? '#7c3aed' : 'transparent',
                }}
            >
                {todo.done && <Check size={11} color="white" strokeWidth={3} />}
            </button>

            <span
                className={css({ flex: 1, fontSize: '0.88rem', transition: 'all 0.15s' })}
                style={{
                    color: todo.done ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.85)',
                    textDecoration: todo.done ? 'line-through' : 'none',
                }}
            >
                {todo.title}
            </span>

            <span
                className={css({ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' })}
            >
                #{todo.id}
            </span>

            <button
                onClick={onRemove}
                className={css({
                    padding: '0.2rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.25)',
                    display: 'flex',
                    transition: 'color 0.15s',
                    _hover: { color: '#fca5a5' },
                })}
            >
                <Trash2 size={14} />
            </button>
        </div>
    )
}
