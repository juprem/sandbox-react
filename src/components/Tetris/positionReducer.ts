import { useReducer } from 'react';
import { Form } from './formModel/formModel';
import { canGoLeft, canGoRight, GridCell, hasHitFormOrBottomOnDown } from './utils/formManager';

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
    grid: GridCell[];
}

type PositionAction = PositionMoving | PositionReiniti | PositionDown;

type StateType = Readonly<{
    position: [number, number];
    lastTick: number;
}>;

function action(state: StateType, actionRed: PositionAction): StateType {
    const { action } = actionRed;
    const { position, lastTick } = state;

    switch (action) {
        case 'down': {
            if (hasHitFormOrBottomOnDown(position, actionRed.form.matrix, actionRed.grid) && lastTick === 1)
                return { ...state, lastTick: 2 };

            if (hasHitFormOrBottomOnDown(position, actionRed.form.matrix, actionRed.grid)) {
                return { position, lastTick: 1 };
            }

            const formInGrid = actionRed.form.matrix.map(
                (it) => [position[0] + it[0], position[1] + it[1] + 1] as const,
            );

            if (formInGrid.some((cell) => cell[1] >= 20)) return state;

            return { position: [position[0], position[1] + 1], lastTick: 0 };
        }
        case 'left':
            return canGoLeft(position, actionRed.form.matrix, actionRed.grid)
                ? { position: [position[0] - 1, position[1]], lastTick }
                : state;
        case 'right':
            return canGoRight(position, actionRed.form.matrix, actionRed.grid)
                ? { position: [position[0] + 1, position[1]], lastTick }
                : state;
        case 'initial':
            return { position: [7, 0], lastTick: 0 };
    }
}

export function usePositionReducer() {
    return useReducer(action, { position: [7, 0], lastTick: 0 } as const);
}
