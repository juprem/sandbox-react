import { useEffect, useReducer, useState } from 'react';
import { todoService } from '@service/todoService.ts';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { todoKeys } from '@hooks/useTodos.ts';

interface customFetchProps {
    url: string;
}

type Action = 'refetch' | 'success' | 'error' | 'loading';
interface ReducerAction {
    action: Action;
    data?: unknown;
    error?: string;
}
interface StateReducer {
    status: 'pending' | 'success' | 'error' | 'loading';
    data?: unknown;
    fetching: boolean;
    error?: string;
    loading?: boolean;
}

function reducer(state: StateReducer, action: ReducerAction): StateReducer {
    switch (action.action) {
        case 'success':
            return { status: 'success', data: action.data, fetching: false, loading: false };
        case 'error':
            return { status: 'error', error: action.error, fetching: false, loading: false };
        case 'refetch':
            return { ...state, fetching: true };
        case 'loading':
            return { ...state, status: 'loading', fetching: true, loading: true };
    }
}

export function useCustomFetch<T>({ url }: customFetchProps) {
    const [refetch, setRefetch] = useState(false);
    const [state, dispatch] = useReducer(reducer, {
        status: 'pending',
        fetching: false,
        data: undefined,
        loading: false,
    });

    useEffect(() => {
        if (state.status === 'pending') {
            dispatch({ action: 'loading' });
        }

        fetch(url)
            .then((data) => {
                if (data.status >= 400) {
                    dispatch({ action: 'error', error: 'Une erreur lors du fetch' });
                    Promise.reject();
                }
                return data.json();
            })
            .then((data) => {
                dispatch({ action: 'success', data: data });
            });
    }, [refetch]);

    if (state.status === 'error') {
        throw new Error("Une erreur c'est passez dans le fetching de la donnée");
    }

    const refetching = () => {
        setRefetch(!refetch);
    };

    return { ...state, data: state.data as T | undefined, refetching } as const;
}

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