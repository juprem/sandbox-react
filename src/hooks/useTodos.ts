import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { todoService } from '../service/todoService';
import { Todo, TodoSchema } from '@model/TodoModel';
import dayjs from 'dayjs';

export const todoKeys = {
    all: ['todo'] as const,
    lists: () => [...todoKeys.all, 'list'] as const,
    list: (search: string) => [...todoKeys.all, 'list', search] as const,
    detail: (id: string) => [...todoKeys.all, id] as const,
};

export const getTodosQueryOptions = () => {
    const { getTodos } = todoService();

    return queryOptions({
        queryFn: () => getTodos(),
        queryKey: todoKeys.lists(),
    });
};

export const getTodoByIdQueryOptions = (id: string) => {
    const { getTodoById } = todoService();

    return queryOptions({
        queryFn: () => getTodoById(id),
        queryKey: todoKeys.detail(id),
    });
};

export function useGetTodo(todoId: string) {
    return useQuery(getTodoByIdQueryOptions(todoId));
}

export function useGetAllTodo() {
    return useQuery(getTodosQueryOptions());
}

export function useCreateTodo() {
    const queryClient = useQueryClient();
    const { postTodo } = todoService();

    return useMutation({
        mutationFn: postTodo,
        onSuccess: (todo) => {
            queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
            console.log('ajout de %s avec succès', todo.name);
        },
    });
}

//demo clé

export function useUpdateTodo() {
    const queryClient = useQueryClient();
    const updateTodo = (): Promise<Todo> =>
        new Promise((resolve) =>
            resolve(
                TodoSchema.parse({
                    id: 'a',
                    name: 'todo number 1',
                    createdTime: dayjs().format(),
                }),
            ),
        );

    return useMutation({
        mutationFn: updateTodo,
        onSuccess: (todo) => {
            queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
            queryClient.invalidateQueries({ queryKey: todoKeys.detail(todo.id) });
            console.log('ajout de %s avec succès', todo.name);
        },
    });
}
