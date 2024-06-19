import { Route } from '../../../routes/todo_.$todoId.tsx';
import { getTodoByIdQueryOptions } from '../../../hooks/useTodos.ts';
import { WithSkeleton } from '../../../component/WithSkeleton/WithSkeleton.tsx';
import { TodoDetailsDisplay } from './TodoDetailsDisplay.tsx';
import { useQuery } from '@tanstack/react-query';

export function TodoDetailsIndex() {
    const { todoId } = Route.useParams();
    const { data: todo, isLoading, isError } = useQuery(getTodoByIdQueryOptions(todoId));

    if (isError) return <>Error</>;

    return (
        <WithSkeleton loading={isLoading}>
            <TodoDetailsDisplay todo={todo} todoId={todoId} />
        </WithSkeleton>
    );
}
