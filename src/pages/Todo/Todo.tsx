import { useTodos } from '../../hooks/useTodos.ts';
import { Card } from '../../component/Card/Card.tsx';
import { Link } from '@tanstack/react-router';
import { css } from '../../../styled-system/css';

export function Todo() {
    const { data } = useTodos();

    return (
        <div className={css({display: 'flex', gap: '1rem'})}>
            {data?.map((it) => (
                <Link key={it.id} to={`/todo/$todoId`} params={{ todoId: it.id }}>
                    <Card title={it.name}>{it.description}</Card>
                </Link>
            ))}
        </div>
    );
}
