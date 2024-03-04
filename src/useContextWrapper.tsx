import { createContext, useContext } from 'react';

const Tcontext = createContext<{ firstName: string } | undefined>(undefined);

export function useContextWrapper() {
    const context = useContext(Tcontext);

    if (!context) {
        throw Error('Context is undefined.....');
    }

    return <Tcontext.Provider value={{ firstName: 'odpjaz' }}>
        <div>
            <div>
                <div></div>
            </div>
        </div>
    </Tcontext.Provider>;
}
