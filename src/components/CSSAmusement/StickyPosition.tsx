import { basicShape } from '../../styles/GlobalStyle';
import { css } from '@styled-system/css';

export function StickyPosition() {
    return (
        <div className={css({ display: 'flex', gap: '1rem', height: '150vh', paddingTop: '2rem' })}>
            <div className={basicShape()} />
            <div className={css({ position: 'sticky', top: '0.5rem', height: 'fit-content' })}>
                <div className={basicShape()} />
            </div>
            <div className={basicShape()} />
        </div>
    );
}
