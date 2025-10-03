import { GridSudoku, isAllowedNumber, isViableNumber, SudokuAllowedNumber } from './createGrid';
import { CellCoordinate } from '../../iterator/GridGenerator';
import { sleep } from '../../../utils/sleep';

export function gridCalculator(
    x: number,
    y: number,
    grid: GridSudoku[][],
) {
    if (x > 8 && y > 8) {
        return;
    }

    setActiveCell({ x, y });

    const cell = grid[x][y];
    const cellNumber = cell.cellNumber;

    let testNumber: 'iterate' | 'next' | 'prev' = 'iterate';

    while (testNumber == 'iterate') {
        const nextNumber = cellNumber + 1;

        console.log("next iteration");

        if (isAllowedNumber(nextNumber) && isViableNumber(grid, cell, nextNumber)) {
            setCellNumber(nextNumber);
            grid[x][y].cellNumber = nextNumber;
            testNumber = 'next';
        }

        if (!isAllowedNumber(nextNumber)) {
            setCellNumber(0);
            grid[x][y].cellNumber = 0;
            testNumber = 'prev';
        }
    }

    if (testNumber == 'next') {
        nextIteration(x, y, grid);
    }

    if (testNumber == 'prev') {
        previousIteration(x, y, grid);
    }
}

async function nextIteration(
    x: number,
    y: number,
    grid: GridSudoku[][],
) {
    const nextX = x == 8 ? 0 : x + 1;
    const nextY = x == 8 ? y + 1 : y;

    await sleep(500);

    gridCalculator(nextX, nextY, grid);
}

async function previousIteration(
    x: number,
    y: number,
    grid: GridSudoku[][],
) {
    const nextX = x > 0 ? x - 1 : 8;
    const nextY = x == 0 ? y - 1 : y;

    await sleep(500);

    gridCalculator(nextX, nextY, grid);
}
