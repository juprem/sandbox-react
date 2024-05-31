import { Route } from '../../../routes/todo_.$todoId.tsx';
import { useGetTodoById } from '../../../hooks/useTodos.ts';
import { WithSkeleton } from '../../../component/WithSkeleton/WithSkeleton.tsx';
import { TodoDetailsDisplay } from './TodoDetailsDisplay.tsx';

export function TodoDetailsIndex() {
    const { todoId } = Route.useParams();
    const { data: todo, isLoading, isError } = useGetTodoById(todoId);

    if (isError) return <>Error</>;

    return (
        <WithSkeleton loading={isLoading}>
            <TodoDetailsDisplay todo={todo} todoId={todoId}/>
        </WithSkeleton>
    );
}
