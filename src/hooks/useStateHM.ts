import { Reducer, useReducer } from 'react';

function reducer<T>(state: T, action: UpdateType<T>) {
    if (action instanceof Function) return action(state);
    return action;
}

type InitType<T> = T | (() => T);
type UpdateType<T> = T | ((previous: T) => T);

const initFunction = <T>(init: InitType<T>) => {
    if (init instanceof Function) return init();
    return init;
};

export function useStateHM<T>(init: InitType<T>) {
    const [state, dispatch] = useReducer<Reducer<T, UpdateType<T>>>(reducer, initFunction(init));

    return [state, dispatch] as const;
}
