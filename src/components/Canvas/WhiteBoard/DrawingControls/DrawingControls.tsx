import { ColorControl } from './ColorControl';
import { css } from '@styled-system/css';
import { FormDrawingSelect } from './FormDrawingSelect';

export function DrawingControls() {
    return (
        <div className={css({ display: 'flex', gap: '1rem' })}>
            <ColorControl />
            <FormDrawingSelect />
        </div>
    );
}
