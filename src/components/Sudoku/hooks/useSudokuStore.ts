import { CellCoordinate } from '../../iterator/GridGenerator';
import { isCellHasViableNumber, createGrid, CellSudoku } from '../utils/createGrid';
import { create } from 'zustand';
import { produce } from 'immer';

type Action = {
  setActiveCell: (cellCoordinate: CellCoordinate) => void;
  setCellNumber: (cellNumber: number) => void;
  setManualCellNumber: (cellNumber: number, calculateGrid: CellSudoku[][]) => void;
  reset: () => void;
};

type State = {
  activeCell: CellCoordinate | null;
  grid: CellSudoku[][];
};

export const useSudokuStore = create<Action & State>((set) => ({
  activeCell: null,
  grid: createGrid(9),
  reset: () => set({ activeCell: null, grid: createGrid(9) }),
  setActiveCell: (cellCoordinate: CellCoordinate) => set({ activeCell: cellCoordinate }),
  setManualCellNumber: (cellNumber: number, calculateGrid: CellSudoku[][]) =>
    set((state) => {
      const activeCell = state.activeCell;

      if (activeCell) {
        const newGrid = produce(state.grid, (grid) => {
          const isViableNumber = isCellHasViableNumber(grid, grid[activeCell.x][activeCell.y]);

          grid[activeCell.x][activeCell.y].cellNumber = cellNumber;
          calculateGrid[activeCell.x][activeCell.y].cellNumber = cellNumber;
          calculateGrid[activeCell.x][activeCell.y].isManualSet = true;
          document
            .getElementById(`${activeCell.x} - ${activeCell.y} - div`)!.textContent = cellNumber.toString();

          grid[activeCell.x][activeCell.y].isValid = isViableNumber;
          grid[activeCell.x][activeCell.y].isManualSet = true;
          grid.forEach((row) => {
            row.forEach((cell) => (cell.isValid = isCellHasViableNumber(grid, cell)));
          });

          return grid;
        });

        return { grid: newGrid };
      }

      return {};
    }),
  setCellNumber: (cellNumber: number) =>
    set((state) => {
      const activeCell = state.activeCell;

      if (activeCell && cellNumber <= state.grid.length) {
        const newGrid = produce(state.grid, (grid) => {
          const isViableNumber = isCellHasViableNumber(grid, grid[activeCell.x][activeCell.y]);

          grid[activeCell.x][activeCell.y].cellNumber = cellNumber;
          grid[activeCell.x][activeCell.y].isValid = isViableNumber;
          grid.forEach((row) => {
            row.forEach((cell) => (cell.isValid = isCellHasViableNumber(grid, cell)));
          });

          return grid;
        });

        return { grid: newGrid };
      }

      return {};
    }),
}));
