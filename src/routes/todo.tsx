import { createFileRoute } from '@tanstack/react-router';
import { Todo } from '../pages/Todo/Todo.tsx';
import { getTodosQueryOptions } from '../hooks/useTodos.ts';

export const Route = createFileRoute('/todo')({
    component: Todo,
    meta: () => [
        {
            title: 'todos',
        },
    ],
    beforeLoad: ({ context }) => ({
        queryClient: context.queryClient,
        breadcrumbs: 'todos',
    }),
    loader: ({ context }) => context.queryClient.ensureQueryData(getTodosQueryOptions()),
    errorComponent: (Error) => <div>Il y a une erreur : {String(Error.error).toString()}</div>,
});
