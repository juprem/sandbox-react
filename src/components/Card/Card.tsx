import classnames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './Card.module.scss';
import { CardTitle } from './CardTitle';
import { CardContent } from './CardContent';
interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    title?: ReactNode;
}

export function Card({ children, className, onClick, title }: CardProps) {
    return (
        <div onClick={onClick} className={classnames(styles.card, className)}>
            {title && <CardTitle title={title} />}
            <CardContent>{children}</CardContent>
        </div>
    );
}
