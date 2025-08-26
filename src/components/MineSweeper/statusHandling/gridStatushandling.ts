import { assign, setup } from 'xstate';
import { BaseSweeperCell } from '../models/cell';
import { createActorContext } from '@xstate/react';
import { generateGrid } from '../generator/generator';
import { Difficulty, difficultyReference } from '../models/difficulty';
import { ChangeCellStatus, GAME_STATUS, processToNextCell } from './changeStatus';

function getGrid(length: number) {
    return generateGrid(Math.ceil(0.2 * length * length), length);
}

const gridMachine = setup({
    types: {
        context: {} as { grid: BaseSweeperCell[][]; gridLength: number; gameStatus: GAME_STATUS },
        events: {} as
            | { type: 'changeStatus'; newCellStatus: ChangeCellStatus }
            | { type: 'reset' }
            | {
                  type: 'difficulty';
                  difficulty: Difficulty;
              },
    },
    actions: {
        changeStatus: assign(({ context }, params: ChangeCellStatus) => {
            const { newGrid, newGameStatus } = processToNextCell(context.grid, params, context.gameStatus);

            return { grid: newGrid, gameStatus: newGameStatus };
        }),
        reset: assign({
            grid: ({ context }) => (context.grid = getGrid(context.gridLength)),
            gameStatus: ({ context }) => (context.gameStatus = 'PLAYING' as GAME_STATUS),
        }),
        difficulty: assign({
            grid: ({ context }, params: number) => (context.grid = getGrid(params)),
            gridLength: ({ context }, params: number) => (context.gridLength = params),
        }),
    },
}).createMachine({
    context: { grid: getGrid(10), gridLength: 10, gameStatus: 'PLAYING' },
    on: {
        changeStatus: {
            actions: {
                type: 'changeStatus',
                params: ({ event }) => event.newCellStatus,
            },
        },
        reset: { actions: 'reset' },
        difficulty: {
            actions: {
                type: 'difficulty',
                params: ({ event }) => difficultyReference[event.difficulty],
            },
        },
    },
});

export const GridActorContext = createActorContext(gridMachine);
