import { Todo } from '@model/TodoModel';
import { css } from '@styled-system/css';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import styles from './Card.module.scss';

interface CardProps {
    readonly todo: Todo;
}


const priorityColor = {
    LOW: '#52c44e',
    MEDIUM: '#c4c24e',
    HIGH: '#C44E4F',
}

export function TodoCard({ todo }: CardProps) {
    return (
        <div
            style={{
                border: `2px solid ${priorityColor[todo.priority]}`,
            }}
            className={css({
                borderRadius: '5px',
                backgroundColor: 'whitesmoke',
                width: '200px',
                height: '150px',
                padding: '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            })}
        >
            <div>
            <div className={css({ fontSize: '11px' })}>{dayjs(todo.dueDate).format('DD MMM YYYY HH:mm:ss')}</div>

            </div>
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
