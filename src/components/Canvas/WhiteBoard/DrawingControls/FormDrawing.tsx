import { Select } from 'antd';
import { formOptions } from '../models/CanvasModel';
import { WhiteBoardStateContext } from '../stateManager/WhiteBoardState';
import { css } from '@styled-system/css';

export function FormDrawing() {
    const actorRef = WhiteBoardStateContext.useActorRef();

    return (
        <Select
            className={css({
                width: '150px',
            })}
            defaultValue="LINE"
            options={formOptions}
            onChange={(value) => actorRef.send({ type: 'form', newForm: value })}
        />
    );
}
