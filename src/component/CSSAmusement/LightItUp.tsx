import { css } from '@styled-system/css';
import { lightItUp } from '../../styles/GlobalStyle';

export function LightItUp() {
    return (
        <div
            className={css({
                width: '100%',
                height: '100vh',
                backgroundColor: 'black',
                display: 'flex',
                gap: '10rem',
                justifyContent: 'center',
                alignItems: 'center',
            })}
        >
            <div className={lightItUp()} />
            <div className={lightItUp({ visual: 'smooth' })} />
            <div className={lightItUp({ visual: 'medium' })} />
            <div className={lightItUp({ visual: 'big' })} />
        </div>
    );
}
