import { PropsWithChildren, ReactNode } from 'react';
import styles from './CompoundComponent.module.scss';

interface WithSectionContentProps {
    readonly children: ReactNode;
    readonly disable?: boolean;
}

export function WithSection({ children }: PropsWithChildren) {
    return <div className={styles.container}>{children}</div>;
}

function Content({ children, disable = false }: WithSectionContentProps) {
    const childStyle = disable ? styles.disableChild : styles.child;

    return <div className={childStyle}>{children}</div>;
}

function Title({ children }: PropsWithChildren) {
    return <div className={styles.text}>{children}</div>;
}

WithSection.Content = Content;
WithSection.Title = Title;
