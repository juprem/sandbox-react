import { createContext, ReactNode, useContext } from 'react';

interface BasicContextModel {
    title: string;
    sub: number
}

const BasicContext = createContext<BasicContextModel | undefined>(undefined);

export function WithBasicContext({ value, children }: { value: BasicContextModel; children: ReactNode }) {
    return <BasicContext.Provider value={value}>{children}</BasicContext.Provider>;
}

export function useBasicContext() {
    const context = useContext(BasicContext);

    if (!context) {
        throw Error('You are not inside a BasicContext');
    }

    return context;
}
