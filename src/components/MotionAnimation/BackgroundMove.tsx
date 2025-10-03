import { RefObject, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import styles from './MotionAnimation.module.scss';
import { Button } from 'antd';

export function BackgroundMove() {
    const [activeButton, setActiveButton] = useState<{ position: number; width: number }>({ position: 0, width: 50 });
    const parent = useRef<HTMLDivElement>(null);
    const child1 = useRef<HTMLButtonElement>(null);
    const child2 = useRef<HTMLButtonElement>(null);
    const child3 = useRef<HTMLButtonElement>(null);
    const child4 = useRef<HTMLButtonElement>(null);
    const xB = useMotionValue(0);
    const wi = useMotionValue(0);

    const setBackground = (ref: RefObject<HTMLButtonElement | null>) =>
        setActiveButton({
            position: ref.current!.getBoundingClientRect().x - parent.current!.getBoundingClientRect().x - 1,
            width: ref.current!.getBoundingClientRect().width,
        });


    return (
        <>
            <div className={styles.list} ref={parent}>
                <motion.div
                    className={styles.background}
                    style={{ x: xB, width: wi, y: -4 }}
                    animate={{
                        x: activeButton.position - 5,
                        width: activeButton.width + 10,
                    }}
                    transition={{
                        duration: 1,
                    }}
                />
                <Button ref={child1} onClick={() => setBackground(child1)}>
                    1
                </Button>
                <Button ref={child2} onClick={() => setBackground(child2)}>
                    2paozdjkaoizdaz
                </Button>
                <Button ref={child3} onClick={() => setBackground(child3)}>
                    3
                </Button>
                <Button ref={child4} onClick={() => setBackground(child4)}>
                    4
                </Button>
            </div>
        </>
    );
}
