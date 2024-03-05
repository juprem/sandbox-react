// import { AnyActionArg, useReducer } from 'react';
//
// function reducer<T extends AnyActionArg>(state: T, action: UpdateType<T>) {
//     if (action instanceof Function) return action(state);
//     return action;
// }
//
// type InitType<T> = T | (() => T);
// type UpdateType<T extends AnyActionArg> = T | ((previous: T) => T);
//
// const initFunction = <T>(init: InitType<T>) => {
//     if (init instanceof Function) return init();
//     return init;
// };
//
// export function useStateHM<T extends AnyActionArg>(init: InitType<T>) {
//     const [state, dispatch] = useReducer<T, UpdateType<T>>(reducer, initFunction(init));
//
//     return [state, dispatch] as const;
// }
