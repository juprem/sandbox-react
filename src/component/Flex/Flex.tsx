import { ReactNode } from 'react';
import { Measure } from '../../model/classnameModels';

interface FlexProps {
    children: ReactNode;
    flexDirection?: 'column' | 'row';
    gap?: Measure | 0;
    height?: Measure | 'fit-content';
    alignItems?: 'center' | 'none';
    justifyContent?: 'space-between' | 'none';
}

export function Flex({
    children,
    gap = 0,
    height = 'fit-content',
    flexDirection = 'row',
    alignItems = 'none',
    justifyContent = 'none',
}: FlexProps) {
    return <div style={{ display: 'flex', flexDirection, gap, height, alignItems, justifyContent }}>{children}</div>;
}
