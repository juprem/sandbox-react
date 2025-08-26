import { css } from '@styled-system/css';
import { useCanvasSizeInit } from './hooks/useCanvasSizeInit';
import { DrawingControls } from './DrawingControls/DrawingControls';

export function CanvasDrawing() {
    const ref = useCanvasSizeInit();

    return (
        <div className={css({ display: 'flex', flexDirection: 'column', height: '100%' })}>
            <DrawingControls />
            <div ref={ref} className={css({ height: '90%' })}>
                <canvas
                    className={css({
                        backgroundColor: 'white',
                    })}
                ></canvas>
            </div>
        </div>
    );
}
