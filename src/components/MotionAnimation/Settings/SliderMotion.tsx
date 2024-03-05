import { Slider } from 'antd/lib';
import { flex } from '../../../styles/GlobalStyle';
import { css } from '@styled-system/css';

interface ElasticSliderProps {
    setter: (val: number) => void;
    val: number;
    label: string;
    min?: number;
    max?: number;
}

export function SliderMotion({ setter, val, min = 0, max = 100, label }: ElasticSliderProps) {
    return (
        <div className={flex()}>
            <div className={css({ color: 'rebeccapurple' })}>{label}</div>
            <Slider className={css({ flex: 4 })} min={min} max={max} onChange={setter} />
            <div
                className={css({
                    minWidth: '40px',
                    height: '25px',
                    borderRadius: '4px',
                    flex: 1,
                    backgroundColor: 'white',
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                })}
            >
                {val}
            </div>
        </div>
    );
}
