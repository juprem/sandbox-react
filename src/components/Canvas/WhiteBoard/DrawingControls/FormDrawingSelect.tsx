import { Select } from 'antd';
import { FormDrawing, formOptions } from '../models/CanvasModel';
import { WhiteBoardStateContext } from '../stateManager/WhiteBoardState';
import { css } from '@styled-system/css';

export function FormDrawingSelect() {
    const actorRef = WhiteBoardStateContext.useActorRef();

    return (
        <Select
            className={css({
                width: '150px',
            })}
            defaultValue="LINE"
            options={formOptions}
            onChange={(value: FormDrawing) => actorRef.send({ type: 'form', newForm: value })}
        />
    );
}
