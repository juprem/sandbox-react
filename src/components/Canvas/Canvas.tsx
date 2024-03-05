import { css } from '@styled-system/css';
import { Button, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useEventListener } from '@hooks/useEventListener';

function drawRect(x: number, y: number, color: string, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 10, 10);
}

const buf = new Uint32Array(1);

function get3random() {
    crypto.getRandomValues(buf);
    const rand1 = buf[0] / (0xffffffff + 1);
    crypto.getRandomValues(buf);
    const rand2 = buf[0] / (0xffffffff + 1);
    crypto.getRandomValues(buf);
    const rand3 = buf[0] / (0xffffffff + 1);

    return [rand1, rand2, rand3] as const;
}

const color = ['red', 'blue', 'green', 'purple', 'yellow', 'white'];

export function Canvas() {
    const [pos, setPos] = useState<[number, number]>([0, 0]);
    const ctx = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const currentCtx = canvas.getContext('2d')!;
            ctx.current = currentCtx;
            currentCtx.reset();
            currentCtx.fillStyle = 'green';
            currentCtx.fillRect(140, 140, 20, 20);
        }
        const intervalId = setInterval(() => {
            const [r1, r2, r3] = get3random();
            drawRect(Math.floor(r1 * 300), Math.floor(r2 * 300), color[Math.floor(r3 * 6)], canvas!.getContext('2d')!);
        }, 100);

        return () => {
            clearInterval(intervalId);
        };
    }, []);
    useEventListener({
        eventType: 'keydown',
        listener: (event) => {
            if (event.key == 'z') {
                const [r1, r2] = get3random();
                if (ctx.current) {
                    drawRect(Math.trunc(r1 * 300), Math.trunc(r2 * 300), 'red', ctx.current);
                }
            }
        },
    });

    return (
        <div
            className={css({
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            })}
        >
            <div className={css({ position: 'absolute', top: 10, left: 50 })}>
                <Input onChange={(val) => setPos((prev) => [+val.target.value, prev[1]])} type="number" />
                <Input onChange={(val) => setPos((prev) => [prev[0], +val.target.value])} type="number" />
                <Button onClick={() => drawRect(pos[0], pos[1], 'red', ctx.current!)} />
            </div>
            <canvas width={300} height={300} className={css({ backgroundColor: 'white', marginTop: '200px' })}></canvas>
        </div>
    );
}
