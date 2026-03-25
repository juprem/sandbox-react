import { createFileRoute } from '@tanstack/react-router'
import { EffectTodo } from '../components/EffectTodo'

export const Route = createFileRoute('/effect-todo')({
    component: EffectTodo,
})
