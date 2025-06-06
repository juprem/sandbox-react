import { useState } from 'react';
import styles from './ViewTransition.module.scss';

export function BasicViewTransition() {
    const [divState, setDivState] = useState(false);

    return (
        <div>
            {divState ? (
                <div
                    onClick={() => document.startViewTransition(() => setDivState(!divState))}
                    className={styles.normal}
                    style={{ viewTransitionName: 'a' }}
                />
            ) : (
                <div
                    style={{ viewTransitionName: 'a' }}
                    onClick={() => document.startViewTransition(() => setDivState(!divState))}
                    className={styles.big}
                />
            )}
        </div>
    );
}
