import { expect, test } from 'vitest';
import { GridGenerator } from '../../iterator/GridGenerator';
import { EmptyCell, NumberOfMineCell } from '../models/cell';
import { findUnprocessedHiddenCells } from './changeStatus';

const grid = [
    ...new GridGenerator(3, ({ x, y, neighbors }) => {
        if (x == 1 && y == 1) {
            return {
                x,
                y,
                neighbors,
                type: 'EMPTY',
                status: 'HIDDEN',
            } satisfies EmptyCell;
        } else {
            return {
                x,
                y,
                neighbors,
                type: 'NUMBER',
                status: 'HIDDEN',
                numberOfMine: 1,
            } satisfies NumberOfMineCell;
        }
    }),
];

test('given a grid, when clicking on empty cell, then reveal all the cell around correctly', () => {
    const emptyClickedCell = grid[1][1];
    const t = findUnprocessedHiddenCells(emptyClickedCell, grid, new Set());

    expect(t.length).toBe(9);
});
