import { basicShape, TRContainer } from '../../styles/GlobalStyle.ts';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import { SliderMotion } from './Settings/SliderMotion.tsx';
import { Centered } from '../Visualisation/Centered.tsx';
interface BasicAnimationProps {}

export function BasicAnimation({}: BasicAnimationProps) {
    const [rotation, setRotation] = useState<number>(0);
    const [x, setX] = useState<number>(0);
    const xB = useMotionValue(0);
    const background = useTransform(
        xB,
        [-200, -100, 0, 100, 200],
        ['#FFAABB', '#a80929', '#740994', '#122ACBFF', '#12C5CBFF'],
    );

    return (
        <Centered>
            <div className={TRContainer()}>
                <SliderMotion setter={(val) => setRotation(val)} val={rotation} label="rotation" max={200} />
                <SliderMotion setter={(val) => setX(val)} val={x} label="x" max={200} min={-200} />
            </div>
            <motion.div
                style={{ x: xB, background }}
                animate={{
                    rotate: rotation,
                    x: x,
                }}
                transition={{}}
                className={basicShape()}
            />
        </Centered>
    );
}
