import { expect, test } from 'vitest';
import {
    displayForm,
    GridCell,
    hasHitFormOrBottomOnDown,
    includePosition,
} from '@component/Tetris/utils/formManager';
import { l, line, reverseS, s, square, t } from '@component/Tetris/formModel/formModel';

const bigGrid = Array.from(
    { length: 20 * 15 },
    (_, i): GridCell => [i % 15, Math.trunc(i / 15), 'whitesmoke'] as const,
);
const bigGridWithForm = Array.from(
    { length: 20 * 15 },
    (_, i): GridCell => [i % 15, Math.trunc(i / 15), i === 5 ? 'red' : 'whitesmoke'] as const,
);
const startingPos = [7, 0] as const;

test('includePosition should return true when Tuple position is included in the form', () => {
    const pos = [4, 2] as const;
    const formPosition: [number, number][] = [
        [0, 0],
        [3, 6],
        [4, 2],
        [1, 0],
    ];
    expect(includePosition(pos, formPosition)).toBeTruthy;
});

test('includePosition should return false when Tuple position is not included in the form', () => {
    const pos = [4, 2] as const;
    const formPosition: [number, number][] = [
        [0, 0],
        [3, 6],
        [2, 4],
        [1, 0],
    ];
    expect(includePosition(pos, formPosition)).toBeFalsy;
});

test('square form is correctly displayed in grid', () => {
    const theoricFormPos: [number, number][] = [
        [7, 0],
        [8, 0],
        [7, 1],
        [8, 1],
    ];
    const grid = displayForm(bigGrid, square, startingPos);
    const allColoredCell = grid.filter((cell) => cell[2] !== 'whitesmoke');

    expect(allColoredCell.every((cell) => includePosition([cell[0], cell[1]], theoricFormPos))).toBeTruthy;
});

test('line form is correctly displayed in grid', () => {
    const theoricFormPos: [number, number][] = [
        [7, 0],
        [8, 0],
        [9, 0],
        [10, 0],
    ];
    const grid = displayForm(bigGrid, line, startingPos);
    const allColoredCell = grid.filter((cell) => cell[2] !== 'whitesmoke');

    expect(allColoredCell.every((cell) => includePosition([cell[0], cell[1]], theoricFormPos))).toBeTruthy;
});

test('T form is correctly displayed in grid', () => {
    const theoricFormPos: [number, number][] = [
        [7, 0],
        [8, 0],
        [9, 0],
        [8, 1],
    ];
    const grid = displayForm(bigGrid, t, startingPos);
    const allColoredCell = grid.filter((cell) => cell[2] !== 'whitesmoke');

    expect(allColoredCell.every((cell) => includePosition([cell[0], cell[1]], theoricFormPos))).toBeTruthy;
});

test('s form is correctly displayed in grid', () => {
    const theoricFormPos: [number, number][] = [
        [7, 0],
        [8, 0],
        [8, 1],
        [9, 1],
    ];
    const grid = displayForm(bigGrid, s, startingPos);
    const allColoredCell = grid.filter((cell) => cell[2] !== 'whitesmoke');

    expect(allColoredCell.every((cell) => includePosition([cell[0], cell[1]], theoricFormPos))).toBeTruthy;
});

test('reverseS form is correctly displayed in grid', () => {
    const theoricFormPos: [number, number][] = [
        [7, 1],
        [8, 1],
        [8, 0],
        [9, 1],
    ];
    const grid = displayForm(bigGrid, reverseS, startingPos);
    const allColoredCell = grid.filter((cell) => cell[2] !== 'whitesmoke');

    expect(allColoredCell.every((cell) => includePosition([cell[0], cell[1]], theoricFormPos))).toBeTruthy;
});

test('l form is correctly displayed in grid', () => {
    const theoricFormPos: [number, number][] = [
        [7, 0],
        [8, 0],
        [9, 0],
        [9, 1],
    ];
    const grid = displayForm(bigGrid, l, startingPos);
    const allColoredCell = grid.filter((cell) => cell[2] !== 'whitesmoke');

    expect(allColoredCell.every((cell) => includePosition([cell[0], cell[1]], theoricFormPos))).toBeTruthy;
});

test('function hasHitDown should return true on bottom hit', () => {
    const xyPos = [7, 19] as const;

    expect(hasHitFormOrBottomOnDown(xyPos, square.matrix, bigGrid)).toBeTruthy;
});

test('function hasHitDown should return true on bottom hit when xyPos over grid', () => {
    const xyPos = [7, 20] as const;

    expect(hasHitFormOrBottomOnDown(xyPos, square.matrix, bigGrid)).toBeTruthy;
});

test('function hasHitDown should return falseon empty bottom', () => {
    const xyPos = [7, 5] as const;

    expect(hasHitFormOrBottomOnDown(xyPos, square.matrix, bigGrid)).toBeFalsy;
});

test('function hasHitDown should return true on form hit', () => {
    const xyPos = [1, 0] as const;

    expect(hasHitFormOrBottomOnDown(xyPos, [[0, 0]], bigGridWithForm)).toBeTruthy;
});
