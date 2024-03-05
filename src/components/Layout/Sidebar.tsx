import { css } from '@styled-system/css';
import { ReactNode } from 'react';

interface SidebarProps {
    children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
    return (
        <div
            className={css({
                width: '250px',
                height: '100vh',
                position: 'absolute',
                backgroundColor: 'black',
                padding: '5px',
            })}
        >
            {children}
        </div>
    );
}
