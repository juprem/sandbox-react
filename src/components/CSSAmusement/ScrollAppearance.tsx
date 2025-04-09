import { css } from '@styled-system/css';
import styles from './CSSAmusement.module.scss';

export function ScrollAppearance() {
    return (
        <>
            <div className={css({ height: '30vh', width: '3rem', backgroundColor: 'orange' })}></div>
            <div className={css({ height: '30vh', width: '3rem', backgroundColor: 'orange' })}></div>
            <div className={css({ height: '30vh', width: '3rem', backgroundColor: 'orange' })}></div>
            <div className={styles.scrollAppearance}>Animation</div>
            <div className={css({ height: '30vh', width: '3rem', backgroundColor: 'orange' })}></div>
            <div className={css({ height: '30vh', width: '3rem', backgroundColor: 'orange' })}></div>
            <div className={styles.scrollDisapear}>
                <div className={css({ backgroundColor: 'red' })}>Animation</div>
            </div>
            <div className={css({ height: '30vh', width: '3rem', backgroundColor: 'orange' })}></div>
            <div className={css({ height: '30vh', width: '3rem', backgroundColor: 'orange' })}></div>
            <div className={styles.scrollAppearance}>Animation</div>
            <div className={css({ height: '30vh', width: '3rem', backgroundColor: 'orange' })}></div>
            <div className={css({ height: '30vh', width: '3rem', backgroundColor: 'orange' })}></div>
            <div className={css({ height: '30vh', width: '3rem', backgroundColor: 'orange' })}></div>
            <div className={css({ height: '30vh', width: '3rem', backgroundColor: 'orange' })}></div>
        </>
    );
}
