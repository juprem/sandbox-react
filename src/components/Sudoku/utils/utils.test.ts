import { describe, expect, it } from 'vitest';
import { createGrid, SudokuCellNeighbors } from './createGrid';
import { getBorderColor } from './getBorderColor';
import { setUpBis, SetUpCell } from './gridCalculator';

const grid = createGrid(9);

const neighborOf2X4YCell: SudokuCellNeighbors = {
  lineCoordinate: Array.from({ length: 9 }, (_, i) => ({ x: 2, y: i })).filter(
    (neighbor) => neighbor.x != 2 || neighbor.y != 4,
  ),
  columnCoordinate: Array.from({ length: 9 }, (_, i) => ({ x: i, y: 4 })).filter(
    (neighbor) => neighbor.x != 2 || neighbor.y != 4,
  ),
  boxCoordinate: [
    { x: 0, y: 3 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 0, y: 4 },
    { x: 1, y: 4 },
    { x: 0, y: 5 },
    { x: 1, y: 5 },
    { x: 2, y: 5 },
  ],
};

it('calculate neighbor of cell in center', () => {
  const cell2X4Y = grid[2][4];

  expect(cell2X4Y.neighbours.lineCoordinate).toEqual(expect.arrayContaining(neighborOf2X4YCell.lineCoordinate));
  expect(cell2X4Y.neighbours.columnCoordinate).toEqual(expect.arrayContaining(neighborOf2X4YCell.columnCoordinate));
  expect(cell2X4Y.neighbours.boxCoordinate).toEqual(expect.arrayContaining(neighborOf2X4YCell.boxCoordinate));
});

describe("calculate color of cell's border", () => {
  it('calculate border color of 0 0 cell', () => {
    const expected = {
      borderTop: '1px solid orange',
      borderBottom: '1px solid lightsmoke',
      borderLeft: '1px solid orange',
      borderRight: '1px solid lightsmoke',
    };

    const result = getBorderColor(0, 0, 9);

    expect(result).toEqual(expected);
  });

  it('calculate border color of 0 1 cell', () => {
    const expected = {
      borderTop: '1px solid orange',
      borderBottom: '1px solid lightsmoke',
      borderLeft: '1px solid lightsmoke',
      borderRight: '1px solid lightsmoke',
    };

    const result = getBorderColor(0, 1, 9);

    expect(result).toEqual(expected);
  });

  it('calculate border color of 1 1 cell', () => {
    const expected = {
      borderTop: '1px solid lightsmoke',
      borderBottom: '1px solid lightsmoke',
      borderLeft: '1px solid lightsmoke',
      borderRight: '1px solid lightsmoke',
    };

    const result = getBorderColor(1, 1, 9);

    expect(result).toEqual(expected);
  });

  it('calculate border color of 2 2 cell', () => {
    const expected = {
      borderTop: '1px solid lightsmoke',
      borderBottom: '1px solid orange',
      borderLeft: '1px solid lightsmoke',
      borderRight: '1px solid orange',
    };

    const result = getBorderColor(2, 2, 9);

    expect(result).toEqual(expected);
  });

  it('calculate border color of 2 1 cell', () => {
    const expected = {
      borderTop: '1px solid lightsmoke',
      borderBottom: '1px solid lightsmoke',
      borderLeft: '1px solid lightsmoke',
      borderRight: '1px solid orange',
    };

    const result = getBorderColor(2, 1, 9);

    expect(result).toEqual(expected);
  });
});

const baseSetup: SetUpCell[] = [
  { x: 0, y: 0, cellNumber: 1 },
  { x: 1, y: 0, cellNumber: 2 },
  { x: 0, y: 1, cellNumber: 3 },
  { x: 1, y: 1, cellNumber: 4 },
  { x: 2, y: 2, cellNumber: 1 },
  { x: 3, y: 3, cellNumber: 4 },
];

const expected = [1, 3, 4, 2, 2, 4, 3, 1, 4, 2, 1, 3, 3, 1, 2, 4];

it('calculate the right sudoku 4x4', () => {
  const grid4x4 = setUpBis(baseSetup, 4);

  const res = grid4x4!.flatMap((row) => row.map((cell) => cell.cellNumber));

  expect(res).toEqual(expected);
});
