import { ReactNode } from 'react';
import { css } from '../../../styled-system/css';

interface CenteredBlockProps {
    children: ReactNode;
}

export function CenteredBlock({ children }: CenteredBlockProps) {
    return <div className={css({ width: '100%', display: 'flex', justifyContent: 'center' })}>{children}</div>;
}
