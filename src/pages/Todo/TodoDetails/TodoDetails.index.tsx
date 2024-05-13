// interface TodoDetailsProps {}

import { Route } from '../../../routes/todo_.$todoId.tsx';
import { useTodoId } from '../../../hooks/useTodos.ts';
import { css } from '../../../../styled-system/css';

export function TodoDetailsIndex() {
    const { todoId } = Route.useParams();
    const { data: todo, isLoading, isError } = useTodoId(todoId);

    if (isLoading || !todo) return <>Loading...</>;
    if (isError) return <>Error</>;

    return (
        <>
            <div className={css({ fontSize: '25px', fontWeight: 'bold' })}>{todo.name}</div>
            <div>{todo.description}</div>
        </>
    );
}
