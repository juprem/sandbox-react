import { useGetAllTodo } from '@hooks/useTodos';
import { Card } from '../../components/Card/Card';
import { Link } from '@tanstack/react-router';
import { css } from '@styled-system/css';
import { CreateTodoModal } from './CreateTodo/CreateTodoModal';

export function Todo() {
    const { data } = useGetAllTodo();

    return (
        <>
            <CreateTodoModal />
            <div className={css({ display: 'flex', gap: '1rem' })}>
                {data?.map((it) => (
                    <Link key={it.id} to={`/todo/$todoId`} params={{ todoId: it.id }}>
                        <Card title={it.name}>{it.description}</Card>
                    </Link>
                ))}
            </div>
        </>
    );
}
