import { css } from '@styled-system/css';
import styles from './MotionAnimation.module.scss';

export function StickyAnimation() {
    return (
        <>
            <div className={css({ height: '100vh' })} />
            <div className={styles.slicesLayout}>
                <div className={styles.slice} />
                <div className={styles.slice} />
                <div className={styles.slice} />
                <div className={styles.slice} />
                <div className={styles.slice} />
                <div className={styles.slice} />
                <div className={styles.slice} />
                <div className={styles.slice} />
                <div className={styles.slice} />
                <div className={styles.slice} />
                <div className={styles.slice} />
            </div>
            <div className={css({ height: '100vh' })} />
        </>
    );
}
