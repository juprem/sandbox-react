import { ReactNode } from 'react';
import { css } from '@styled-system/css';

interface ContentProps {
    children: ReactNode;
}

export function Content({ children }: ContentProps) {
    return (
        <div
            className={css({
                padding: '1rem',
                marginLeft: '250px',
                height: '100vh',
                overflow: 'auto',
                backgroundColor: '#242424 !important',
            })}
        >
            {children}
        </div>
    );
}
