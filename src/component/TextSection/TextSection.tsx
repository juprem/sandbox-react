import { ReactNode } from 'react';
import { textSection } from '../../styles/GlobalStyle.ts';
import { Separator } from '../CodeBlock/Separator.tsx';

interface TextSectionProps {
    children: ReactNode;
    separator?: boolean;
    isTop?: boolean;
}

export function TextSection({ children, separator = false, isTop }: TextSectionProps) {
    return (
        <>
            <div className={textSection({ visual: isTop ? 'top' : undefined })}>{children}</div>
            <Separator display={separator} />
        </>
    );
}
