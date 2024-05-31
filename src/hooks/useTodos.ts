import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { todoService } from '../service/todoService.ts';

export const todoKeys = {
    all: ['todo'] as const,
    list: () => [...todoKeys.all, 'list'] as const,
    detail: (id: string) => [...todoKeys.all, id] as const,
};

export function useTodos() {
    const { getTodos } = todoService();

    return useQuery({
        queryFn: () => getTodos(),
        queryKey: todoKeys.list(),
    });
}

export function useGetTodoById(id: string) {
    const { getTodoById } = todoService();

    return useQuery({
        queryFn: () => getTodoById(id),
        queryKey: todoKeys.detail(id),
    });
}

export function useCreateTodo() {
    const queryClient = useQueryClient();
    const { postTodo } = todoService();

    return useMutation({
        mutationFn: postTodo,
        onSuccess: (todo) => {
            queryClient.invalidateQueries({ queryKey: todoKeys.list() });
            console.log('ajout de %s avec succès', todo.name);
        },
    });
}
