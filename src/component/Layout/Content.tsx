import { ReactNode } from 'react';
import { css } from '../../../styled-system/css';

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
                background: 'linear-gradient(90deg, #f5deb3, #F5CA9C )',
            })}
        >
            {children}
        </div>
    );
}
