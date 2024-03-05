import { useEffect } from 'react';
import { basicShape } from '../../styles/GlobalStyle';

interface MountingTestingProps {
    content: string;
}

export function MountingTesting({ content }: MountingTestingProps) {
    useEffect(() => {
        console.log('mounting');

        return () => {
            console.log('unmounting');
        };
    }, []);

    return <div className={basicShape({ visual: 'circle' })}>{content}</div>;
}
