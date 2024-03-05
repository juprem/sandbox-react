import { TodoDetailsDisplay } from './TodoDetailsDisplay';
import { useGetTodo } from '@hooks/useTodos';
import { Route } from '@routes/todo/$todoId';
import { Link } from '@tanstack/react-router';
import { css } from '@styled-system/css';
import { WithSkeleton } from '../../../components/WithSkeleton/WithSkeleton';

const backNavigation = '<-- Revenir à la page des todos';

export function TodoDetailsIndex() {
    const { todoId } = Route.useParams();
    const { data: todo, isError, isLoading } = useGetTodo(todoId);

    if (isError) return <>Error</>;

    return (
        <>
            <Link to="/todo">{backNavigation}</Link>
            <div className={css({ marginTop: '2rem' })}>
                <WithSkeleton loading={isLoading}>
                    {todo ? <TodoDetailsDisplay todo={todo} todoId={todoId} /> : null}
                </WithSkeleton>
            </div>
        </>
    );
}
