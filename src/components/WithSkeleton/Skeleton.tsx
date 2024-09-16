import { css } from '@styled-system/css';
import { motion } from 'framer-motion';
import { Measure } from '@model/classnameModels';

interface SkeletonProps {
    height: Measure;
    width: Measure;
    getWidth: number;
}

export function Skeleton({ width, height, getWidth }: SkeletonProps) {
    return (
        <div
            className={css({
                backgroundColor: `lightcyan`,
                width,
                height,
                borderRadius: '5px',
            })}
        >
            <motion.div
                className={css({
                    backgroundColor: '#c7ffff',
                    background: 'linear-gradient(90deg, lightcyan 0%, #c7ffff 50%, lightcyan 100%)',
                    blur: '20%',
                    height: '100%',
                    borderRadius: '5px',
                })}
                style={{
                    width: getWidth * 0.2,
                }}
                animate={{
                    translateX: [0, getWidth * 0.8, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
}
