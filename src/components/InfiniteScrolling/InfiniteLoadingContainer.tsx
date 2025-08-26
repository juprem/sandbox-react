import { css } from '@styled-system/css';
import { InfiniteScrolling } from './InfiniteScrolling';
import { InfiniteQueryPage } from './InfiniteQueryPage';

export function InfiniteLoadingContainer() {
    return (
        <div className={css({ display: 'flex', gap: '2rem', flexDirection: 'column' })}>
            <div
                className={css({
                    borderRadius: '1rem',
                    height: '400px',
                    border: '1px solid lightgray',
                    overflow: 'auto',
                    position: 'relative',
                })}
            >
                <div
                    className={css({
                        zIndex: 1,
                        position: 'sticky',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '20px',
                        backgroundColor: 'rgb(255,255,255,0.01)',
                        backdropBlur: 'sm',
                        backdropFilter: 'blur(3px)',
                    })}
                />
                <div className={css({ padding: '0 1rem' })}>
                    <InfiniteScrolling />
                </div>
            </div>
            <InfiniteQueryPage />
        </div>
    );
}
