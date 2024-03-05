import { ReactNode } from 'react';

interface DragProps {
    children: ReactNode;
    setNodeRef: (element: HTMLElement | null) => void;
}

export function Drag({ children, setNodeRef }: DragProps) {
    return <div ref={setNodeRef}>{children}</div>;
}
