import { Task } from '../../../model/TaskModel.ts';
import { css } from '../../../../styled-system/css';
import { flex } from '../../../styles/GlobalStyle.ts';
import { usePostTask } from '../../../hooks/useTasks.ts';
import { useState } from 'react';

interface ShortTaskDisplayProps {
    task: Task;
    onClick: () => void;
}

export function ShortTaskDisplay({ task, onClick }: ShortTaskDisplayProps) {
    const postTask = usePostTask();
    const [check, setCheck] = useState(task.done);
    console.log('update', task.name);

    return (
        <div className={flex()}>
            <input
                className={css({ cursor: 'pointer' })}
                type="checkbox"
                checked={check}
                onChange={(e) => {
                    setCheck(e.target.checked);
                    postTask.mutate(
                        { ...task, done: e.target.checked },
                        {
                            onError: () => setCheck(!e.target.checked),
                        },
                    );
                }}
            />
            <div onClick={onClick} className={css({ cursor: 'pointer' })}>
                {task.name}
            </div>
        </div>
    );
}
