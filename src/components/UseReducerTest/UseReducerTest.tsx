import { createContext, Dispatch, useContext, useReducer } from 'react';
import { Button } from 'antd';

interface StateBase {
    name: string;
    age: number;
}

type Action = 'george' | 'jack';

interface ContextTestProps {
    state: StateBase;
    dispatcher: Dispatch<Action>;
}

const ContextText = createContext<ContextTestProps | undefined>(undefined);

function useContextText() {
    const context = useContext(ContextText);

    if (!context) {
        throw new Error('useContextText');
    }

    return context;
}

function reducer(state: StateBase, action: Action) {
    switch (action) {
        case 'george':
            return { ...state, name: 'george' };
        case 'jack':
            return { ...state, name: 'jack' };
    }
    throw new Error(`Unknown action: ${JSON.stringify(action)}`);
}


export function UseReducerTest() {
    const [state, dispatch] = useReducer(reducer, { name: '', age: 0 });

    return (
        <ContextText.Provider
            value={{
                state: state,
                dispatcher: dispatch,
            }}
        >
            <Component1 />
            <Component2 />
        </ContextText.Provider>
    );
}

function Component1() {
    const { state, dispatcher } = useContextText();

    return <Button onClick={() => dispatcher(state.name === 'jack' ? 'george' : 'jack')} />;
}

function Component2() {
    const { state } = useContextText();

    return <>{state.name}</>;
}
