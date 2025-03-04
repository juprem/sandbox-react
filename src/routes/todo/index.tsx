import { createFileRoute } from '@tanstack/react-router'
import { Todo } from '@pages/Todo/Todo'
import { getTodosQueryOptions } from '@hooks/useTodos'

export const Route = createFileRoute('/todo/')({
  component: Todo,
  beforeLoad: ({ context }) => ({
    queryClient: context.queryClient,
    breadcrumbs: 'todos',
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(getTodosQueryOptions()),
  errorComponent: (errorReason) => (
    <div>Il y a une erreur : {String(errorReason.error).toString()}</div>
  ),
})
