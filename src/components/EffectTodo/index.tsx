import { css } from '@styled-system/css'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ch01Intro } from './chapters/Ch01Intro'
import { Ch02BasicEffects } from './chapters/Ch02BasicEffects'
import { Ch03Pipelines } from './chapters/Ch03Pipelines'
import { Ch04ErrorHandling } from './chapters/Ch04ErrorHandling'
import { Ch05EffectGen } from './chapters/Ch05EffectGen'
import { Ch06Services } from './chapters/Ch06Services'
import { Ch07TodoApp } from './chapters/Ch07TodoApp'
import { ChapterNav } from './ChapterNav'
import { ChapterPagination } from './ChapterPagination'
import { ChapterDef } from './types'

const CHAPTERS: ChapterDef[] = [
    {
        number: 1,
        title: 'What is Effect?',
        subtitle: 'Mental model & type signature',
        tag: 'Effect<A,E,R>',
        component: Ch01Intro,
    },
    {
        number: 2,
        title: 'Basic Effects',
        subtitle: 'succeed, fail, sync, try, run',
        tag: 'constructors',
        component: Ch02BasicEffects,
    },
    {
        number: 3,
        title: 'Pipelines',
        subtitle: 'pipe, map, flatMap, tap',
        tag: 'composition',
        component: Ch03Pipelines,
    },
    {
        number: 4,
        title: 'Error Handling',
        subtitle: 'TaggedError, catchTag, match',
        tag: 'errors',
        component: Ch04ErrorHandling,
    },
    {
        number: 5,
        title: 'Effect.gen',
        subtitle: 'Generator-based async/await',
        tag: 'generators',
        component: Ch05EffectGen,
    },
    {
        number: 6,
        title: 'Services & Layers',
        subtitle: 'Context.Tag, Layer, provide',
        tag: 'DI',
        component: Ch06Services,
    },
    {
        number: 7,
        title: 'Todo App',
        subtitle: 'Everything assembled',
        tag: 'capstone',
        component: Ch07TodoApp,
    },
]

export function EffectTodo() {
    const [active, setActive] = useState(0)
    const ActiveChapter = CHAPTERS[active].component

    return (
        <div
            className={css({
                display: 'flex',
                height: '100%',
                color: 'white',
                overflow: 'hidden',
            })}
        >
            <ChapterNav chapters={CHAPTERS} active={active} onSelect={setActive} />

            <main
                className={css({
                    flex: 1,
                    overflowY: 'auto',
                    padding: '2.5rem 3rem 3rem',
                })}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <ActiveChapter />
                    </motion.div>
                </AnimatePresence>

                <ChapterPagination
                    active={active}
                    chapters={CHAPTERS}
                    onPrev={() => setActive((p) => Math.max(0, p - 1))}
                    onNext={() => setActive((p) => Math.min(CHAPTERS.length - 1, p + 1))}
                />
            </main>
        </div>
    )
}
