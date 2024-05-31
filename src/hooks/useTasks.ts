import { taskService } from '../service/taskService.ts';
import { useMutation, useQuery } from '@tanstack/react-query';

export const taskKey = {
    all: ['task'] as const,
    list: () => [...taskKey.all, 'list'] as const,
    listByTodo: (id: string) => [...taskKey.all, 'todo', id] as const,
    detail: (id: string) => [...taskKey.all, id] as const,
};

export const useGetTasksByTodo = (id: string) => {
    const { getTaskByTodo } = taskService();

    return useQuery({
        queryFn: () => getTaskByTodo(id),
        queryKey: taskKey.listByTodo(id),
    });
};

export const usePostTask = () => {
    const { putTask } = taskService();

    return useMutation({
        mutationFn: putTask,
        onSuccess: (task) => {
            console.log("mise à jour de la task %s", task.name)
        },
        onError: (task) =>  console.log('Une erreur c\'est passé lors de l\'update de la task : %s', task.name),
    })
};
