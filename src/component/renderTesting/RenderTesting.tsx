import { ReactNode, useState } from 'react';
import { Button } from 'antd';
import { WithBasicContext } from '@hooks/WithBasicContext';

interface RenderTestingProps {
    children: ReactNode;
    propsChildren: ReactNode;
}

export function RenderTesting({ children, propsChildren }: RenderTestingProps) {
    const [counter, setCounter] = useState<number>(0);

    return (
        <WithBasicContext value={{ title: 'Jojo', sub: counter }}>
            <Button onClick={() => setCounter(counter + 1)}>Clicking : {counter}</Button>
            {children}
            {propsChildren}
        </WithBasicContext>
    );
}
