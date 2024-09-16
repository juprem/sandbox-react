import { Route } from '@routes/todo_.$todoId';
import { WithSkeleton } from '../../../components/WithSkeleton/WithSkeleton';
import { TodoDetailsDisplay } from './TodoDetailsDisplay';
import { useGetTodo } from '@hooks/useTodos';

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
