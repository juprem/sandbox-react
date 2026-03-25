import { CellCoordinate } from '../../iterator/GridGenerator';

export interface CellSudoku {
  x: number;
  y: number;
  cellNumber: number;
  isManualSet: boolean;
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

export function createGrid(size: number) {
  return Array.from({ length: size }, (_, i) =>
    Array.from(
      { length: size },
      (_, j): CellSudoku => ({
        x: i,
        y: j,
        cellNumber: 0,
        isValid: true,
        isManualSet: false,
        neighbours: calculateLine({ x: i, y: j }, size),
      }),
    ),
  );
}

function calculateLine(pos: CellCoordinate, size: number) {
  const sqrtSize = Math.sqrt(size);
  const lineCoordinate = Array.from({ length: size }, (_, i) => ({ x: pos.x, y: i })).filter(
    (neighbor) => pos.x != neighbor.x || pos.y != neighbor.y,
  );
  const columnCoordinate = Array.from({ length: size }, (_, i) => ({ x: i, y: pos.y })).filter(
    (neighbor) => pos.x != neighbor.x || pos.y != neighbor.y,
  );
  const boxX = Math.trunc(pos.x / sqrtSize);
  const boxY = Math.trunc(pos.y / sqrtSize);

  const boxCoordinate = Array.from({ length: sqrtSize }, (_, i) =>
    Array.from({ length: sqrtSize }, (_, j) => ({ x: boxX * sqrtSize + i, y: boxY * sqrtSize + j })).filter(
      (neighbor) => pos.x != neighbor.x || pos.y != neighbor.y,
    ),
  ).flat();

  return { lineCoordinate, columnCoordinate, boxCoordinate } satisfies SudokuCellNeighbors;
}

export function isCellHasViableNumber(grid: CellSudoku[][], cell: CellSudoku) {
  const cellNumber = cell.cellNumber;

  const isNumberInsideLine = neighborHasNumber(grid, cell.neighbours.lineCoordinate, cellNumber);
  if (isNumberInsideLine) {
    return false;
  }

  const isNumberInsideColumn = neighborHasNumber(grid, cell.neighbours.columnCoordinate, cellNumber);
  if (isNumberInsideColumn) {
    return false;
  }

  const isNumberInsideBox = neighborHasNumber(grid, cell.neighbours.boxCoordinate, cellNumber);
  return !isNumberInsideBox;
}

export function isViableNumber(grid: CellSudoku[][], cell: CellSudoku, cellNumber: number) {
  if (cellNumber > grid.length) return false;

  const isNumberInsideLine = neighborHasNumber(grid, cell.neighbours.lineCoordinate, cellNumber);

  if (isNumberInsideLine) {
    return false;
  }

  const isNumberInsideColumn = neighborHasNumber(grid, cell.neighbours.columnCoordinate, cellNumber);
  if (isNumberInsideColumn) {
    return false;
  }

  const isNumberInsideBox = neighborHasNumber(grid, cell.neighbours.boxCoordinate, cellNumber);
  return !isNumberInsideBox;
}

function neighborHasNumber(grid: CellSudoku[][], set: CellCoordinate[], cellNumber: number) {
  if (cellNumber == 0) return false;

  return set.some((cell) => grid[cell.x][cell.y].cellNumber === cellNumber);
}
