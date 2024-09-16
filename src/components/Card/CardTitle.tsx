import { ReactNode } from 'react';
import styles from './Card.module.scss';

interface TitleCardProps {
    title: ReactNode;
}

export function CardTitle({ title }: TitleCardProps) {
    return (
        <div className={styles.titleContainer}>
            <div className={styles.titleText}>{title}</div> <div className={styles.separator} />
        </div>
    );
}
