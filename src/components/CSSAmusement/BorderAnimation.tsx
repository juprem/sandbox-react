import { css } from '@styled-system/css';

export function BorderAnimation() {
    return (
        <div
            className={css({
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '20px',
                width: 'fit-content',
                zIndex: 20,
            })}
        >
            <div
                className={css({
                    position: 'absolute',
                    inset: 0,
                    background: 'white',
                    borderRadius: '20px',
                    zIndex: -1,
                })}
            >
                <div
                    className={css({
                        offsetPath: 'border-box',
                        position: 'absolute',
                        offsetAnchor: '100% 50%',
                        background: 'radial-gradient( 100% 100% at right, #8abad3, transparent 50%)',
                        aspectRatio: '2 / 1',
                        width: '100px',
                        animation: 'trail 6s linear infinite',
                    })}
                />
            </div>
            <div
                className={css({
                    border: '2px solid transparent',
                    textAlign: 'center',
                    padding: '0 1.5rem',
                    background: 'linear-gradient(#ffffff, #e0e0e0) padding-box transparent',
                    borderRadius: '20px',
                })}
            >
                GGdazdazdazdazdazdazdazd
            </div>
        </div>
    );
}


