import { Task } from '@model/TaskModel';
import { css } from '@styled-system/css';

interface TodoDetailsTasksProps {
    task: Task;
}

export function TodoDetailsTasks({ task }: TodoDetailsTasksProps) {
    return <div className={css({ flex: 1 })}>{task.description}</div>;
}
