import { ReactNode } from 'react';

interface Propss {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: ReactNode;
    className: string;
}

export function Button({ onClick, children, className }: Propss) {
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}
