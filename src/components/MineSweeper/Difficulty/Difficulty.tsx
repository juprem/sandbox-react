import { difficultyOptions, GridActorContext } from '../statusHandling/gridStatushandling';
import { Select } from 'antd';
import { css } from '@styled-system/css';

const options = Object.entries(difficultyOptions).map(([value, label]) => ({ label, value }));

export function Difficulty() {
    const actorRef = GridActorContext.useActorRef();

    return (
        <Select
            className={css({
                width: '200px',
            })}
            options={options}
            onChange={(value) => actorRef.send({ type: 'difficulty', difficulty: value })}
            defaultValue="EASY"
        />
    );
}
