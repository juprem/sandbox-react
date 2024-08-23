import { Todo } from '@model/TodoModel';
import { css } from '@styled-system/css';
import { useGetTasksByTodo } from '@hooks/useTasks';
import { WithSuspenseSkeleton } from '@component/WithSkeleton/WithSuspenseSkeleton';
import { Task } from '@model/TaskModel';
import { Suspense, useState } from 'react';
import { TodoDetailsTasks } from './TodoDetailsTasks';
import { Flex } from '@component/Flex/Flex';
import { ShortTaskDisplay } from '../Task/ShortTaskDisplay';

interface TodoDetailsDisplayProps {
    todo?: Todo;
    todoId: string;
}

export function TodoDetailsDisplay({ todo, todoId }: TodoDetailsDisplayProps) {
    const { data: tasks } = useGetTasksByTodo(todoId);
    const [task, setTask] = useState<Task>();

    if (!todo) return <></>;

    return (
        <Flex height="100%">
            <div className={css({ flex: 1 })}>
                <div className={css({ fontSize: '25px', fontWeight: 'bold' })}>{todo.name}</div>
                <div>{todo.description}</div>
                <Suspense fallback={<WithSuspenseSkeleton width="200px" height="30px" />}>
                    <div
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '2rem',
                        })}
                    >
                        {tasks &&
                            tasks.map((it) => <ShortTaskDisplay onClick={() => setTask(it)} key={it.id} task={it} />)}
                    </div>
                </Suspense>
            </div>
            {task && (
                <>
                    <div
                        className={css({
                            height: '100%',
                            width: '1px',
                            backgroundColor: 'gray',
                            margin: '0 1rem',
                        })}
                    />
                    <TodoDetailsTasks task={task} />
                </>
            )}
        </Flex>
    );
}
