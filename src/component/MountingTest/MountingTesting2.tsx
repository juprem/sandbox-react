import { useEffect } from 'react';
import { basicShape } from '../../styles/GlobalStyle';

interface MountingTestingProps {
    content: string;
}

export function MountingTesting2({ content }: MountingTestingProps) {
    useEffect(() => {
        console.log('mounting');

        return () => {
            console.log('unmounting');
        };
    }, []);

    return <div className={basicShape()}>{content}</div>;
}
