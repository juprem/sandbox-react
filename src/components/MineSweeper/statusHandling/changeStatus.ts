import { BaseSweeperCell, CELL_STATUS, isNumberOfMineCell } from '../models/cell';
import { produce } from 'immer';
import { CellCoordinate } from '../../iterator/GridGenerator';

export type ChangeCellStatus = {
    x: number;
    y: number;
    status: CELL_STATUS;
};

function changeStatus(grid: BaseSweeperCell[][], params: ChangeCellStatus) {
    const cell = grid[params.x][params.y];
    const { x, y, type, status, neighbors } = cell;
    let isDiscoverAroundNumber = false;

    if ((status == 'REVEALED' && type != 'EMPTY') || (params.status != 'FLAGGED' && status == 'FLAGGED')) {
        if (isNumberOfMineCell(cell)) {
            const flaggedNeighbor = neighbors.reduce((prev, next) => {
                if (grid[next.x][next.y].status == 'FLAGGED') {
                    return prev + 1;
                }
                return prev;
            }, 0);
            if (flaggedNeighbor == cell.numberOfMine) {
                const cellToReveal = getCellAroundFullyFlaggedNumber(grid, x, y);
                isDiscoverAroundNumber = true;

                return {
                    grid: produce(grid, (draft) => {
                        cellToReveal.forEach(({ x: cX, y: cY }) => {
                            draft[cX][cY].status = 'REVEALED';
                        });
                    }),
                    isDiscoverAroundNumber,
                };
            }
        }

        return { grid, isDiscoverAroundNumber };
    }

    if (params.status == 'FLAGGED') {
        return {
            grid: produce(grid, (draft) => {
                draft[params.x][params.y].status = draft[params.x][params.y].status == 'FLAGGED' ? 'HIDDEN' : 'FLAGGED';
            }),
            isDiscoverAroundNumber,
        };
    }

    if (type == 'EMPTY') {
        const newGrid = produce(grid, (draft) => {
            const cellToUpdate = findUnprocessedHiddenCells(cell, draft);
            cellToUpdate.forEach((row) => (draft[row.x][row.y].status = 'REVEALED'));
        });
        return { grid: newGrid, isDiscoverAroundNumber };
    }

    return {
        grid: produce(grid, (draft) => {
            draft[params.x][params.y].status = params.status;
        }),
        isDiscoverAroundNumber,
    };
}

export function findUnprocessedHiddenCells(
    cell: BaseSweeperCell,
    grid: BaseSweeperCell[][],
    alreadyProcessed: Set<string> = new Set(),
    cellToProcess: CellCoordinate[] = [],
): CellCoordinate[] {
    const { neighbors, x, y, status, type } = cell;

    const setCellKey = `${x},${y}`;
    const isUnprocessed = type == 'EMPTY' && status == 'HIDDEN' && !alreadyProcessed.has(setCellKey);

    if (isUnprocessed) {
        neighbors
            .filter((cNeighbour) => grid[cNeighbour.x][cNeighbour.y].type == 'NUMBER')
            .forEach((cNeighbour) => {
                if (!alreadyProcessed.has(`${cNeighbour.x},${cNeighbour.y}`)) {
                    alreadyProcessed.add(`${cNeighbour.x},${cNeighbour.y}`);
                    cellToProcess.push({ x: cNeighbour.x, y: cNeighbour.y });
                }
            });

        alreadyProcessed.add(setCellKey);

        cellToProcess.push({ x, y });
    }

    const unprocessedHiddenCells = neighbors.filter(
        (cNeighbour) =>
            grid[cNeighbour.x][cNeighbour.y].status == 'HIDDEN' &&
            grid[cNeighbour.x][cNeighbour.y].type == 'EMPTY' &&
            !alreadyProcessed.has(`${cNeighbour.x},${cNeighbour.y}`),
    );

    unprocessedHiddenCells.forEach((uhc) =>
        findUnprocessedHiddenCells(grid[uhc.x][uhc.y], grid, alreadyProcessed, cellToProcess),
    );

    return cellToProcess;
}

export type GAME_STATUS = 'WIN' | 'GAME_OVER' | 'PLAYING';

export function processToNextCell(grid: BaseSweeperCell[][], params: ChangeCellStatus, gameStatus: GAME_STATUS) {
    if (gameStatus == 'GAME_OVER') {
        return { newGrid: grid, newGameStatus: gameStatus };
    }

    const oldCell = grid[params.x][params.y];

    const { grid: newGrid, isDiscoverAroundNumber } = changeStatus(grid, params);
    const updatedCell = newGrid[params.x][params.y];

    let newGameStatus: GAME_STATUS = 'PLAYING';

    if (oldCell.status == 'REVEALED' && isDiscoverAroundNumber) {
        const hasMine = oldCell.neighbors
            .map((neihbour) => newGrid[neihbour.x][neihbour.y])
            .some((n) => n.type == 'MINE' && n.status == 'REVEALED');

        if (hasMine) {
            newGameStatus = 'GAME_OVER';
        }
        return { newGrid, newGameStatus };
    }

    if (updatedCell.type == 'MINE' && updatedCell.status == 'REVEALED') {
        newGameStatus = 'GAME_OVER';

        return { newGrid, newGameStatus };
    }

    const flaggedCell = grid.flat().filter((cell) => cell.status == 'FLAGGED');
    const nbMine = Math.ceil(0.2 * grid.length * grid.length);

    const hasCheckedOnlyAllMine = flaggedCell.length == nbMine && flaggedCell.every((cell) => cell.type == 'MINE');

    if (hasCheckedOnlyAllMine) {
        newGameStatus = 'WIN';
    }

    return { newGrid, newGameStatus };
}

function getCellAroundFullyFlaggedNumber(grid: BaseSweeperCell[][], x: number, y: number) {
    const { neighbors } = grid[x][y];

    return neighbors.filter((neighbour) => grid[neighbour.x][neighbour.y].status != 'FLAGGED');
}
