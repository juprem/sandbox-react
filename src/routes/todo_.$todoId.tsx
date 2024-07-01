import { createFileRoute } from '@tanstack/react-router';
import { TodoDetailsIndex } from '../pages/Todo/TodoDetails/TodoDetails.index.tsx';

export const Route = createFileRoute('/todo/$todoId')({
    component: TodoDetailsIndex,
    meta: () => [
        {
            title: 'détail',
        },
    ],
});
