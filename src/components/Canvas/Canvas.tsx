import { css } from '@styled-system/css';
import { Button, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useEventListener } from '@hooks/useEventListener';

function drawRect(x: number, y: number, color: string, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 10, 10);
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
            drawRect(
                Math.trunc(Math.random() * 300),
                Math.trunc(Math.random() * 300),
                color[Math.trunc(Math.random() * 6)],
                canvas!.getContext('2d')!,
            );
        }, 10);

        return () => {
            clearInterval(intervalId)
        }
    }, []);
    useEventListener({
        eventType: 'keydown',
        listener: (event) => {
            if (event.key == 'z') {
                drawRect(Math.trunc(Math.random() * 300), Math.trunc(Math.random() * 300), 'red', ctx.current!);
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
            <canvas width={300} height={300} className={css({ backgroundColor: 'white' })}></canvas>
        </div>
    );
}
