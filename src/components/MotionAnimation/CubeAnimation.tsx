import { useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';
import styles from '../crashTest/CrashTest.module.scss';

export function CubeAnimation() {
    const ref = useRef<HTMLDivElement>(null);

    useAnimationFrame((t) => {
        if (!ref.current) return;

        const rotate = Math.sin(t / 10000) * 200;
        const y = (1 + Math.sin(t / 1000)) * -50;
        ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
    });

    return (
        <>
            <div className={styles.blur} />
            <div className={styles.container}>
                <div className={styles.cube} ref={ref}>
                    <div className={styles.front} />
                    <div className={styles.left} />
                    <div className={styles.right} />
                    <div className={styles.top} />
                    <div className={styles.bottom} />
                    <div className={styles.back} />
                </div>
            </div>
        </>
    );}