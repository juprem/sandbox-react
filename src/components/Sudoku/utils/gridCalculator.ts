import { CellSudoku, createGrid, isViableNumber } from './createGrid';

export interface SetUpCell {
  x: number;
  y: number;
  cellNumber: number;
}

export function setUpBis(baseGrid: SetUpCell[], size: number) {
  const newGrid = createGrid(size).map((row) =>
    row.map((cell) => {
      const isSetUp = baseGrid.find(({ x, y, cellNumber }) => x === cell.x && y === cell.y && cellNumber != 0);

      if (isSetUp) {
        cell.cellNumber = isSetUp.cellNumber;
        cell.isManualSet = true;
        return cell;
      }

      return cell;
    }),
  );

  return gridBacktrackingCalculator(newGrid);
}

export function gridBacktrackingCalculator(grid: CellSudoku[][]) {
  let isNotSolved = true;
  let x = 0;
  let y = 0;
  let cellNumber = 1;
  let iteration = 0;

  let isCellCalculating = 'iteration';

  while (isNotSolved) {
    if (iteration > 20000) {
      console.log('not solved', iteration);
      isNotSolved = false;

      continue;
    }

    if (y >= grid.length) {
      isNotSolved = false;

      continue;
    }

    const cell = grid[x][y];

    if (cell.isManualSet) {
      if (isCellCalculating == 'prev') {
        y = x == 0 ? y - 1 : y;
        x = x > 0 ? x - 1 : grid.length - 1;
      } else {
        y = x == grid.length - 1 ? y + 1 : y;
        x = x == grid.length - 1 ? 0 : x + 1;
      }

      continue;
    } else {
      cellNumber = cell.cellNumber + 1;
      isCellCalculating = 'iteration';
    }

    while (isCellCalculating) {
      if (cellNumber > grid.length) {
        isCellCalculating = 'prev';

        grid[x][y].cellNumber = 0;
        document.getElementById(`${x} - ${y} - div`)!.textContent = '0';

        y = x == 0 ? y - 1 : y;
        x = x > 0 ? x - 1 : grid.length - 1;

        break;
      }

      if (isViableNumber(grid, cell, cellNumber)) {
        grid[x][y].cellNumber = cellNumber;

        document.getElementById(`${x} - ${y} - div`)!.textContent = cellNumber.toString();

        isCellCalculating = 'next';

        y = x == grid.length - 1 ? y + 1 : y;
        x = x == grid.length - 1 ? 0 : x + 1;

        break;
      }

      cellNumber++;
      iteration++;
    }
  }

  return grid;
}
