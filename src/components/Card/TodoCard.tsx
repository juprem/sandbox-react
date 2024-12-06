import { Todo } from '@model/TodoModel';
import { css } from '@styled-system/css';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import styles from './Card.module.scss';

interface CardProps {
    todo: Todo;
}

export function TodoCard({ todo }: CardProps) {
    return (
        <div
            className={css({
                borderRadius: '5px',
                backgroundColor: '#C44E4F',
                width: '200px',
                height: '150px',
                padding: '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            })}
        >
            <div className={css({ fontSize: '11px' })}>{dayjs(todo.dueDate).format('DD MMM YYYY HH:mm:ss')}</div>
            <div className={styles.titleText}>{todo.name}</div>
            <div className={css({
                display: 'flex',
                gap: '0.2rem',
                margin: '0 5px',
                overflow: 'scroll',
                scrollbar: 'hidden'
            })}>
                {todo.tags.map((tag) => (
                    <Tag key={tag} color="magenta">
                        {tag}
                    </Tag>
                ))}
            </div>
        </div>
    );
}
