import { css } from '../../../styled-system/css';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Centered } from '../LayoutBlock/Centered';

export function EnhancedSwitch() {
    const [switchOn, setSwitchOn] = useState<boolean>(false);
    const x = useMotionValue(0);
    const val = Math.random().toString(16).slice(2, 6);
    const background = useTransform(x, [0, 20, 50, 75], ['#fa9f04', '#f3dc72', '#e70909', '#8d05e7']);
    const backgroundC = useTransform(x, [0, 75], ['#e70909', '#' + val]);

    return (
        <Centered>
            <motion.div
                className={css({
                    width: '100px',
                    height: '25px',
                    borderRadius: '25px',
                    backgroundColor: 'wheat',
                    padding: '2px',
                    cursor: 'pointer',
                })}
                style={{ background }}
                onClick={() => setSwitchOn(!switchOn)}
            >
                <motion.div
                    className={css({ width: '23px', borderRadius: '50%', height: '100%' })}
                    style={{ x, background: backgroundC }}
                    animate={{
                        x: switchOn ? 73 : 0,
                    }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                    }}
                />
            </motion.div>
        </Centered>
    );
}
