import { taskService } from '@service/taskService';
import { useMutation, useQuery } from '@tanstack/react-query';

export const taskKeys = {
    all: ['task'] as const,
    list: () => [...taskKeys.all, 'list'] as const,
    listByTodo: (id: string) => [...taskKeys.all, 'todo', id] as const,
    detail: (id: string) => [...taskKeys.all, id] as const,
};

export const useGetTasksByTodo = (id: string) => {
    const { getTaskByTodo } = taskService();

    return useQuery({
        queryFn: () => getTaskByTodo(id),
        queryKey: taskKeys.listByTodo(id),
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
