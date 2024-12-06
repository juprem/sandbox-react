import { useReducer } from 'react';
import { Form } from './formModel/formModel';
import {
    canGoLeft,
    canGoRight,
    canRotate,
    getNewForm,
    GridCell, hasFullLine,
    hasHitFormOrBottomOnDown,
    rotate,
} from './utils/formManager';

const bigGrid = Array.from(
    { length: 20 * 15 },
    (_, i): GridCell => [i % 15, Math.trunc(i / 15), 'whitesmoke'] as const,
);

interface PositionMoving {
    action: 'left' | 'right';
}

interface PositionReiniti {
    action: 'initial';
    newGrid: GridCell[];
}

interface PositionDown {
    action: 'down';
}

interface Rotation {
    action: 'rotate';
}

type PositionAction = PositionMoving | PositionReiniti | PositionDown | Rotation;

export type StateType = Readonly<{
    position: [number, number];
    grid: GridCell[];
    lastTick: number;
    currentForm: Form;
    nextForm: Form;
}>;

export function action(state: StateType, actionRed: PositionAction): StateType {
    const { action } = actionRed;
    const { position, lastTick, grid, currentForm } = state;

    switch (action) {
        case 'down': {
            if (hasHitFormOrBottomOnDown(position, currentForm.matrix, grid))
                return { ...state, lastTick: lastTick + 1 };

            const formInGrid = currentForm.matrix.map((it) => [position[0] + it[0], position[1] + it[1] + 1] as const);

            if (formInGrid.some((cell) => cell[1] >= 20)) return state;

            console.log(hasFullLine(grid));

            return { ...state, position: [position[0], position[1] + 1], lastTick: 0 };
        }
        case 'left':
            return canGoLeft(position, currentForm.matrix, grid)
                ? { ...state, position: [position[0] - 1, position[1]] }
                : state;
        case 'right':
            return canGoRight(position, currentForm.matrix, grid)
                ? { ...state, position: [position[0] + 1, position[1]] }
                : state;
        case 'initial':
            return {
                position: [7, 0],
                lastTick: 0,
                grid: actionRed.newGrid,
                currentForm: state.nextForm,
                nextForm: getNewForm(),
            };
        case 'rotate': {
            if (canRotate(grid, currentForm, position)) return { ...state, currentForm: rotate(currentForm) };
            return state;
        }
    }
}

export function usePositionReducer() {
    return useReducer(action, {
        position: [7, 0],
        lastTick: 0,
        grid: bigGrid,
        currentForm: getNewForm(),
        nextForm: getNewForm(),
    } as const);
}
