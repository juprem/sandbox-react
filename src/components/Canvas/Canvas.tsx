import { css } from '@styled-system/css';
import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';

function drawRect(x: number, y: number, color: string, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 10, 10);
}

export function Canvas() {
    const [pos, setPos] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d')!;
            ctx.reset();
            ctx.fillStyle = 'green';
            ctx.fillRect(140, 140, 20, 20);
        }
    }, []);

    return (
        <div
            className={css({
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            })}
        >
            <div className={css({ position: 'absolute', top: 10, left: 50 })}>
                <Input />
                <Input />
                <Button />
            </div>
            <canvas width={300} height={300} className={css({ backgroundColor: 'white' })}></canvas>
        </div>
    );
}
