import { ReactNode } from 'react';
import { css } from '../../../styled-system/css';

interface ContentProps {
    children: ReactNode;
}

export function Content({ children }: ContentProps) {
    return (
        <div
            className={css({
                marginLeft: '250px',
                height: '100vh',
                backgroundColor: '#dedcdc',
                padding: '5px',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
            })}
        >
            {children}
        </div>
    );
}
