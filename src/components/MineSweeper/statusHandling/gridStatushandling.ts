import { assign, setup } from 'xstate';
import { BaseSweeperCell, CELL_STATUS, CellCoordinate } from '../models/cell';
import { createActorContext } from '@xstate/react';
import { produce } from 'immer';
import { generateGrid } from '../generator/generator';

interface ChangeCellStatus {
    x: number;
    y: number;
    status: CELL_STATUS;
}

function getGrid(length: number) {
    return generateGrid(Math.ceil(0.2 * length * length), length);
}

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export const difficultyOptions: Record<Difficulty, string> = {
    EASY: 'facile',
    MEDIUM: 'normal',
    HARD: 'difficile',
};

const difficultyReference: Record<Difficulty, number> = {
    HARD: 30,
    EASY: 10,
    MEDIUM: 20,
};

const gridMachine = setup({
    types: {
        context: {} as { grid: BaseSweeperCell[][]; gridLength: number },
        events: {} as
            | { type: 'changeStatus'; newCellStatus: ChangeCellStatus }
            | { type: 'reset' }
            | {
                  type: 'difficulty';
                  difficulty: Difficulty;
              },
    },
    actions: {
        changeStatus: assign({
            grid: ({ context }, params: ChangeCellStatus) => {
                const { x, y, type, status } = context.grid[params.x][params.y];

                if (status == 'REVEALED' || (params.status != 'FLAGGED' && status == 'FLAGGED')) {
                    return context.grid;
                }

                if (params.status == 'FLAGGED') {
                    return produce(context.grid, (draft) => {
                        draft[params.x][params.y].status =
                            draft[params.x][params.y].status == 'FLAGGED' ? 'HIDDEN' : 'FLAGGED';
                    });
                }

                if (type == 'EMPTY') {
                    const { neighbors } = context.grid[x][y];

                    return produce(context.grid, (draft) => {
                        const cellToUpdate = getEmptyCellsPropagationToReveal(
                            neighbors,
                            draft,
                            new Set(`${x},${y}`),
                            [],
                        );
                        draft[x][y].status = 'REVEALED';
                        cellToUpdate.forEach((row) => (draft[row.x][row.y].status = 'REVEALED'));
                    });
                }

                const newGrid = produce(context.grid, (draft) => {
                    draft[params.x][params.y].status = params.status;
                });
                return newGrid;
            },
        }),
        reset: assign({
            grid: ({ context }) => (context.grid = getGrid(context.gridLength)),
        }),
        difficulty: assign({
            grid: ({ context }, params: number) => (context.grid = getGrid(params)),
            gridLength: ({ context }, params: number) => (context.gridLength = params),
        }),
    },
}).createMachine({
    context: { grid: getGrid(10), gridLength: 10 },
    on: {
        changeStatus: {
            actions: {
                type: 'changeStatus',
                params: ({ event }) => {
                    const { x, status, y } = event.newCellStatus;
                    return { x, y, status };
                },
            },
        },
        reset: { actions: 'reset' },
        difficulty: {
            actions: {
                type: 'difficulty',
                params: ({ event }) => {
                    return difficultyReference[event.difficulty];
                },
            },
        },
    },
});

export const GridActorContext = createActorContext(gridMachine);

function getEmptyCellsPropagationToReveal(
    neighbors: CellCoordinate[],
    grid: BaseSweeperCell[][],
    updatedCell: Set<string>,
    result: CellCoordinate[],
): CellCoordinate[] {
    const hiddenCells = neighbors.filter((neighbour) => {
        const { x: nx, y: ny } = neighbour;
        const nkey = `${nx},${ny}`;
        return grid[nx][ny].type == 'EMPTY' && grid[nx][ny].status == 'HIDDEN' && !updatedCell.has(nkey);
    });

    if (hiddenCells.length == 0) {
        return result;
    }

    hiddenCells.forEach((hcell) => {
        updatedCell.add(`${hcell.x},${hcell.y}`);
        result.push({ x: hcell.x, y: hcell.y });
    });

    return hiddenCells.flatMap((neighbour) =>
        getEmptyCellsPropagationToReveal(grid[neighbour.x][neighbour.y].neighbors, grid, updatedCell, result),
    );
}
