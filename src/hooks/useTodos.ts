import { useQuery } from '@tanstack/react-query';
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

export function useTodoId(id: string) {
    const { getTodoById } = todoService();

    return useQuery({
        queryFn: () => getTodoById(id),
        queryKey: todoKeys.detail(id),
    });
}
