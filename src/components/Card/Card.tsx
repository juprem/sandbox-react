import { ReactNode } from 'react';
import styles from '../crashTest/CrashTest.module.scss';
import { ActionButton } from './ActionButton/ActionButton';
import { CodeDisplayShiki } from '../CodeDisplay/MultiPageCodeShiki/CodeDisplayShiki';

interface CardProps {
    code: string;
    settings?: ReactNode;
    children: ReactNode;
}

export function Card({ code, settings, children }: CardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <ActionButton content={<CodeDisplayShiki content={code} />}>Code</ActionButton>
                <ActionButton content={<div>Settings</div>}>Settings</ActionButton>
            </div>
            <div className={styles.cardContent}>{children}</div>
        </div>
    );
}
