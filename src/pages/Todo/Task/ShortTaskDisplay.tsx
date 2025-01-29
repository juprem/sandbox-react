import { Task } from '../../../model/TaskModel';
import { css } from '../../../../styled-system/css';
import { flex } from '../../../styles/GlobalStyle';
import { usePostTask } from '../../../hooks/useTasks';
import { useState } from 'react';

interface ShortTaskDisplayProps {
    task: Task;
    onClick: () => void;
}

export function ShortTaskDisplay({ task, onClick }: ShortTaskDisplayProps) {
    const postTask = usePostTask();
    const [check, setCheck] = useState(task.done);

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
            <div role="button" onClick={onClick} className={css({ cursor: 'pointer' })}>
                {task.name}
            </div>
        </div>
    );
}
