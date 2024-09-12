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

interface LastTick {
    action: 'lastTick';
}

type PositionAction = PositionMoving | PositionReiniti | PositionDown | LastTick;

type StateType = Readonly<{
    position: [number, number];
    lastTick: boolean;
}>;

function action(state: StateType, actionRed: PositionAction): StateType {
    const { action } = actionRed;
    const { position, lastTick } = state;

    switch (action) {
        case 'down': {
            if (lastTick) return state;

            const formInGrid = actionRed.form.matrix.map(
                (it) => [position[0] + it[0], position[1] + it[1] + 1] as const,
            );

            if (formInGrid.some((cell) => cell[1] >= 20)) return state;

            return { position: [position[0], position[1] + 1], lastTick };
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
            return { position: [7, 0], lastTick: false };
        case 'lastTick':
            return { position, lastTick: true };
    }
}

export function usePositionReducer() {
    return useReducer(action, { position: [7, 0], lastTick: false } as const);
}
