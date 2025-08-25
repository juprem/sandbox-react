import { css } from '@styled-system/css';
import { useEffect, useRef } from 'react';

export function CanvasDrawing() {
    const ctx = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            ctx.current = canvas.getContext('2d')!;
        }
    }, []);

    return (
        <canvas
            width={300}
            height={300}
            className={css({ backgroundColor: 'white', marginTop: '200px' })}
        ></canvas>
    );
}
