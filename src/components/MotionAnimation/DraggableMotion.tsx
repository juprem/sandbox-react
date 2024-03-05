import { motion, useMotionValue, useTransform } from 'framer-motion';
import { basicShape, TRContainer } from '../../styles/GlobalStyle';
import { useState } from 'react';
import { Switch } from 'antd';
import { SliderMotion } from './Settings/SliderMotion';
import { css } from '@styled-system/css';
import { Centered } from '../LayoutBlock/Centered';

export function DraggableMotion() {
    const [elastic, setElastic] = useState<number>(0);
    const [momentum, setMomentum] = useState<boolean>(false);
    const x = useMotionValue(0);
    const background = useTransform(x, [-200, 0, 200], ['#ff0000', '#7700ff', 'rgb(47,255,0)']);

    return (
        <Centered>
            <div className={TRContainer()}>
                <SliderMotion setter={(val) => setElastic(val / 100)} val={elastic} label="elastic" />
                <Switch className={css({ width: '50px' })} onChange={(val) => setMomentum(val)} />
            </div>
            <motion.div
                drag
                style={{ x, background }}
                className={basicShape()}
                dragElastic={elastic}
                dragMomentum={momentum}
            />
        </Centered>
    );
}
