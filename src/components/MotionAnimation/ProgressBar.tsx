import { motion, useMotionValue, useTransform } from 'framer-motion';
import { css } from '@styled-system/css';
import styles from './MotionAnimation.module.scss';

interface ProgressBarProps {
    progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
    const xB = useMotionValue(0);
    const background = useTransform(xB, [0, 50, 100], ['#ae3030', '#c18931', '#51b137']);

    return (
        <div className={styles.progress}>
            <motion.div
                style={{ background, width: `${progress}%` }}
                onUpdate={(latest) => {
                    const percent = Number(latest['x'].toString().split('.')[0].slice(1));
                    xB.set(Number.isNaN(Number(percent)) ? progress : progress - percent);
                }}
                animate={{
                    x: [`-100%`, 0],
                }}
                transition={{
                    duration: 2,
                    ease: 'easeInOut',
                    repeatDelay: 1,
                }}
                className={css({ height: '100%', backgroundColor: 'orange' })}
            ></motion.div>
        </div>
    );
}
