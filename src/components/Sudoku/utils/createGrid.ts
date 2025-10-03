import { CellCoordinate } from '../../iterator/GridGenerator';

export interface GridSudoku {
    x: number;
    y: number;
    cellNumber: SudokuAllowedNumber;
    isValid: boolean;
    neighbours: {
        lineCoordinate: CellCoordinate[];
        columnCoordinate: CellCoordinate[];
        boxCoordinate: CellCoordinate[];
    };
}

export interface SudokuCellNeighbors {
    lineCoordinate: CellCoordinate[];
    columnCoordinate: CellCoordinate[];
    boxCoordinate: CellCoordinate[];
}

export type SudokuAllowedNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export function isAllowedNumber(newNumber: number): newNumber is SudokuAllowedNumber {
    return newNumber >= 0 && newNumber <= 9;
}

export function createGrid() {
    const size = 9;

    return Array.from({ length: size }, (_, i) =>
        Array.from(
            { length: size },
            (_, j) =>
                ({
                    x: i,
                    y: j,
                    cellNumber: 0,
                    isValid: true,
                    neighbours: calculateLine({ x: i, y: j }, size),
                }) satisfies GridSudoku,
        ),
    );
}

function calculateLine(pos: CellCoordinate, size: number) {
    const lineCoordinate = Array.from({ length: size }, (_, i) => ({ x: pos.x, y: i })).filter(
        (neighbor) => pos.x != neighbor.x || pos.y != neighbor.y,
    );
    const columnCoordinate = Array.from({ length: size }, (_, i) => ({ x: i, y: pos.y })).filter(
        (neighbor) => pos.x != neighbor.x || pos.y != neighbor.y,
    );
    const boxX = Math.trunc(pos.x / 3);
    const boxY = Math.trunc(pos.y / 3);

    const boxCoordinate = Array.from({ length: 3 }, (_, i) =>
        Array.from({ length: 3 }, (_, j) => ({ x: boxX * 3 + i, y: boxY * 3 + j })).filter(
            (neighbor) => pos.x != neighbor.x || pos.y != neighbor.y,
        ),
    ).flat();

    return { lineCoordinate, columnCoordinate, boxCoordinate } satisfies SudokuCellNeighbors;
}

export function isCellHasViableNumber(grid: GridSudoku[][], cell: GridSudoku) {
    const cellNumber = cell.cellNumber;

    const isNumberInsideLine = setHasNumber(grid, cell.neighbours.lineCoordinate, cellNumber);
    if (isNumberInsideLine) {
        return false;
    }

    const isNumberInsideColumn = setHasNumber(grid, cell.neighbours.columnCoordinate, cellNumber);
    if (isNumberInsideColumn) {
        return false;
    }

    const isNumberInsideBox = setHasNumber(grid, cell.neighbours.boxCoordinate, cellNumber);
    return !isNumberInsideBox;
}

export function isViableNumber(grid: GridSudoku[][], cell: GridSudoku, cellNumber: SudokuAllowedNumber) {
    const isNumberInsideLine = setHasNumber(grid, cell.neighbours.lineCoordinate, cellNumber);
    if (isNumberInsideLine) {
        return false;
    }

    const isNumberInsideColumn = setHasNumber(grid, cell.neighbours.columnCoordinate, cellNumber);
    if (isNumberInsideColumn) {
        return false;
    }

    const isNumberInsideBox = setHasNumber(grid, cell.neighbours.boxCoordinate, cellNumber);
    return !isNumberInsideBox;
}


function setHasNumber(grid: GridSudoku[][], set: CellCoordinate[], cellNumber: SudokuAllowedNumber) {
    if (cellNumber == 0) return false;

    return set.some((cell) => grid[cell.x][cell.y].cellNumber === cellNumber);
}
