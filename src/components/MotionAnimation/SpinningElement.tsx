import { css } from '@styled-system/css';
import ViteIcon from '@assets/react.svg';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function SpinningElement() {
    const [done, setDone] = useState(false);

    return (
        <motion.div
            animate={done ? { rotateY: '360deg' } : { rotateY: 0 }}
            transition={{
                duration: 1,
                type: 'spring',
            }}
            whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
            }}
            onClick={() => {
                setDone(!done);
            }}
            className={css({ width: 'fit-content' })}
        >
            <img id="my-id" src={ViteIcon} alt="Vite icon" />
        </motion.div>
    );
}
