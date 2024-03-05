import { css } from '@styled-system/css';
import { Form } from '../Tetris/formModel/formModel';
import { displayForm, GridCell } from '../Tetris/utils/formManager';
import { memo } from 'react';

const littleGrid = Array.from({ length: 16 }, (_, i): GridCell => [i % 4, Math.trunc(i / 4), 'whitesmoke'] as const);

interface NextFormGridProps {
    nextForm: Form;
}

export const NextFormGrid = memo(({ nextForm }: NextFormGridProps) => {
    const gridWithForm = displayForm(littleGrid, nextForm, [0, 0]);

    return (
        <div
            className={css({
                display: 'grid',
            })}
            style={{ gridTemplateColumns: `repeat(${4}, 30px)` }}
        >
            {gridWithForm.map((it) => {
                return (
                    <div
                        key={it.toString()}
                        style={{
                            backgroundColor: it[2],
                        }}
                        className={css({
                            height: '30px',
                            width: '30x',
                            border: '1px solid lightgray',
                        })}
                    />
                );
            })}
        </div>
    );
})
