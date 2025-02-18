import { WithSkeleton } from '../../../components/WithSkeleton/WithSkeleton';
import { TodoDetailsDisplay } from './TodoDetailsDisplay';
import { useGetTodo } from '@hooks/useTodos';
import { Route } from '@routes/todo/$todoId';


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
