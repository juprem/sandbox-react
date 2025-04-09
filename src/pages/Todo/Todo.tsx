import { useGetAllTodo } from '@hooks/useTodos';
import { Link } from '@tanstack/react-router';
import { css } from '@styled-system/css';
import { CreateTodoModal } from './CreateTodo/CreateTodoModal';
import { TodoCard } from '../../components/Card/TodoCard';

export function Todo() {
    const { data } = useGetAllTodo();

    return (
        <>
            <CreateTodoModal />
            <div className={css({ display: 'flex', gap: '1rem', color: 'black' })}>
                {data?.map((todo) => (
                    <Link key={todo.id} to={`/todo/$todoId`} params={{ todoId: todo.id }}>
                        <TodoCard todo={todo} />
                    </Link>
                ))}
            </div>
        </>
    );
}
