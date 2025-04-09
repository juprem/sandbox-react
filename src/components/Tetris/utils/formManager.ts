import { allForm, Form } from '../formModel/formModel';

export type GridCell = readonly [number, number, string];

export function displayForm(grid: GridCell[], form: Form, startingPosition: readonly [number, number]) {
    const formPosition = form.matrix.map((it) => [startingPosition[0] + it[0], startingPosition[1] + it[1]] as const);

    return grid.map((it) => {
        const xyPos = [it[0], it[1]] as const;
        return [...xyPos, includePosition(xyPos, formPosition) ? form.color : it[2]] as const;
    });
}

export function includePosition(position: readonly [number, number], formPosition: (readonly [number, number])[]) {
    return formPosition.some((pos) => pos[0] === position[0] && pos[1] === position[1]);
}

export function hasHitFormOrBottomOnDown(
    xyPos: readonly [number, number],
    formPosition: (readonly [number, number])[],
    grid: GridCell[],
) {
    const formInGrid = formPosition.map((it) => [xyPos[0] + it[0], xyPos[1] + it[1] + 1] as const);

    if (formInGrid.some((cell) => cell[1] > 19)) return true;

    return formInGrid
        .map((it) => grid[it[0] + it[1] * 15])
        .filter((it) => it?.length > 2)
        .some((it) => it[2] !== 'whitesmoke');
}

export function canGoLeft(
    xyPos: readonly [number, number],
    formPosition: (readonly [number, number])[],
    grid: GridCell[],
) {
    const formInGrid = formPosition.map((it) => [xyPos[0] + it[0] - 1, xyPos[1] + it[1]] as const);

    return formInGrid.some((it) => it[0] < 0)
        ? false
        : formInGrid.map((it) => grid[it[0] + it[1] * 15]).every((it) => it[2] === 'whitesmoke');
}

export function canGoRight(
    xyPos: readonly [number, number],
    formPosition: (readonly [number, number])[],
    grid: GridCell[],
) {
    const formInGrid = formPosition.map((it) => [xyPos[0] + it[0] + 1, xyPos[1] + it[1]] as const);

    return formInGrid.some((it) => it[0] > 14)
        ? false
        : formInGrid.map((it) => grid[it[0] + it[1] * 15]).every((it) => it[2] === 'whitesmoke');
}

export function getNewForm() {
    const rand = Math.floor(Math.random() * 6);
    return allForm[rand];
}

export function gameOver(grid: GridCell[]) {
    const topLine = grid.slice(0, 14);
    return topLine.some((cell) => cell[2] !== 'whitesmoke');
}

export function rotate(form: Form): Form {
    return { ...form, matrix: form.matrix.map((matrixCoor) => [matrixCoor[1], -matrixCoor[0]] as const) };
}

export function canRotate(grid: GridCell[], form: Form, position: readonly [number, number]) {
    const rotatedForm = rotate(form);

    const formPosition = rotatedForm.matrix.map((it) => [position[0] + it[0], position[1] + it[1]] as const);

    if (formPosition.some((it) => it[0] < 0 || it[1] < 0 || it[0] > 15 || it[1] > 20)) {
        return false;
    }

    return !formPosition.some((pos) => grid[pos[0] + pos[1] * 15][2] !== 'whitesmoke');
}

export function hasFullLine(grid: GridCell[]) {
    const lined = Array.from({ length: 20 }, (_, i) => {
        return { x: i, line: grid.filter((cell) => cell[1] === i).map((cell) => cell[2]) };
    });

    return lined.filter((line) => !line.line.some((it) => it === 'whitesmoke')).map((it) => it.x);
}
