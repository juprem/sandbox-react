import { ReactNode } from 'react';
import { css } from '../../../styled-system/css';

interface FlexProps {
    children: ReactNode;
    flexDirection?: 'column' | 'row';
    gap?: `${number}px` | `${number}rem` | 0;
}

export function Flex({ children, gap = 0, flexDirection = 'row' }: FlexProps) {
    return (
        <div className={css({ display: 'flex', flexDirection, gap })}>
            {children}
        </div>
    );
}
