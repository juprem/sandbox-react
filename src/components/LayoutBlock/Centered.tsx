import { ReactNode } from 'react';
import { css } from '../../../styled-system/css';

interface CenteredProps {
    children: ReactNode
}

export function Centered({children}: CenteredProps) {
    return <div className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    })}>{children}</div>;
}