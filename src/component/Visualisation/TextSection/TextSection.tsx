import { ReactNode } from 'react';
import { textSection } from '../../../styles/GlobalStyle.ts';

interface TextSectionProps {
    children: ReactNode;
}

export function TextSection({ children }: TextSectionProps) {
    return <div className={textSection()}>{children}</div>;
}
