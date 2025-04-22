import { motion } from 'framer-motion';
export function InfiniteAnimation() {
    return (
        <motion.div
            style={{ backgroundColor: 'white', height: '200px', width: '200px' }}
            animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ['20%', '20%', '50%', '50%', '20%'],
            }}
            transition={{
                duration: 2,
                ease: 'easeInOut',
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
            }}
        />
    );
}
