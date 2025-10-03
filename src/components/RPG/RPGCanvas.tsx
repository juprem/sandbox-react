import { useRef } from 'react';

export function RPGCanvas() {
    const canvasRef = useRef(null);

    return <canvas width={500} height={500} ref={canvasRef}></canvas>;
}