import { createFileRoute } from '@tanstack/react-router'
import { TodoDetailsIndex } from '@pages/Todo/TodoDetails/TodoDetails.index'

export const Route = createFileRoute('/todo_/$todoId')({
  component: TodoDetailsIndex,
})
