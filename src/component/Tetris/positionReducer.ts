import { useReducer } from 'react';
import { Form } from '@component/Tetris/formModel/formModel';
import { canGoLeft, canGoRight, GridCell } from '@component/Tetris/utils/formManager';

interface PositionMoving {
    form: Form;
    grid: GridCell[];
    action: 'left' | 'right';
}

interface PositionReiniti {
    action: 'initial';
}

interface PositionDown {
    action: 'down';
    form: Form;
}

type PositionAction = PositionMoving | PositionReiniti | PositionDown;

function action(state: readonly [number, number], actionRed: PositionAction): readonly [number, number] {
    const { action } = actionRed;
    switch (action) {
        case 'down': {
            const formInGrid = actionRed.form.matrix.map((it) => [state[0] + it[0], state[1] + it[1] + 1] as const);

            if (formInGrid.some((cell) => cell[1] >= 20)) return state

            return [state[0], state[1] + 1] as const;
        }
        case 'left':
            return canGoLeft(state, actionRed.form.matrix, actionRed.grid) ? [state[0] - 1, state[1]] : state;
        case 'right':
            return canGoRight(state, actionRed.form.matrix, actionRed.grid) ? [state[0] + 1, state[1]] : state;
        case 'initial':
            return [7, 0];
    }
}

export function usePositionReducer() {
    return useReducer(action, [7, 0] as const);
}
