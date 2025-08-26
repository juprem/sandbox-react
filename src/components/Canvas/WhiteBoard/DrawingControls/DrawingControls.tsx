import { ColorControl } from './ColorControl';
import { css } from '@styled-system/css';
import { FormDrawing } from './FormDrawing';

export function DrawingControls() {
    return (
        <div className={css({ display: 'flex', gap: '1rem' })}>
            <ColorControl />
            <FormDrawing />
        </div>
    );
}
