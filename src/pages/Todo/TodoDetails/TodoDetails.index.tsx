import { Route } from '@routes/todo_.$todoId.tsx';
import { WithSkeleton } from '@component/WithSkeleton/WithSkeleton.tsx';
import { TodoDetailsDisplay } from './TodoDetailsDisplay.tsx';
import { useGetTodo } from '@hooks/useTodos.ts';

export function TodoDetailsIndex() {
    const { todoId } = Route.useParams();
    const { data: todo, isError, isLoading } = useGetTodo(todoId);


    if (isError) return <>Error</>;

    return (
        <WithSkeleton loading={isLoading}>
            <TodoDetailsDisplay todo={todo} todoId={todoId} />
        </WithSkeleton>
    );
}
