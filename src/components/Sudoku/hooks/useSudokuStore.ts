import { CellCoordinate } from '../../iterator/GridGenerator';
import { isCellHasViableNumber, createGrid, GridSudoku, SudokuAllowedNumber } from '../utils/createGrid';
import { create } from 'zustand';
import { produce } from 'immer';

type Action = {
    setActiveCell: (cellCoordinate: CellCoordinate) => void;
    setCellNumber: (cellNumber: SudokuAllowedNumber) => void;
};

type State = {
    activeCell: CellCoordinate | null;
    grid: GridSudoku[][];
};

export const useSudokuStore = create<Action & State>((set) => ({
    activeCell: null,
    grid: createGrid(),
    setActiveCell: (cellCoordinate: CellCoordinate) => set({ activeCell: cellCoordinate }),
    setCellNumber: (cellNumber: SudokuAllowedNumber) =>
        set((state) => {
            const activeCell = state.activeCell;

            if (activeCell) {
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
