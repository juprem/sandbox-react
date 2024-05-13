import { ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardContentProps {
    children: ReactNode;
}

export function CardContent({ children }: CardContentProps) {
    return <div className={styles.content}>{children}</div>;
}
