import { CellStatus } from './LifeGame';

export function calculateNextIteration(cells: CellStatus[][]) {
    return cells.map((it) =>
        it.map((it2): CellStatus => {
            const aroundCell = getAllAroundAliveCell(it2, cells);
            const nextStatus = getNextStatus(aroundCell, it2.isAlive, it2.age);
            return { position: it2.position, neighbour: it2.neighbour, ...nextStatus };
        }),
    );
}

function getNextStatus(allAroundCell: number, isAlive: boolean, age: number) {
    if (!isAlive && allAroundCell === 3) return { isAlive: true, age: 0 };

    if (isAlive && allAroundCell > 1 && allAroundCell < 4) return { isAlive: true, age: age + 1 };

    return { isAlive: false, age: 0 };
}

function getAllAroundAliveCell(cell: CellStatus, cells: CellStatus[][]) {
    return cell.neighbour.reduce((nAlive, [posx, posy]) => {
        const cellAlive = cells[posx][posy].isAlive ? 1 : 0;

        return nAlive + cellAlive;
    }, 0);
}

export function cleanUp(cells: CellStatus[][]): CellStatus[][] {
    return cells.map((it) => it.map((it2) => ({ ...it2, isAlive: false }) satisfies CellStatus));
}

export function init(matrixSize: number): CellStatus[][] {
    return Array.from({ length: matrixSize }, (_, index) =>
        Array.from({ length: matrixSize }, (_, index2) => ({
            isAlive: index2 % 2 === 0,
            position: [index, index2],
            age: 0,
            neighbour: getAllNeighbour([index, index2], matrixSize),
        })),
    );
}

export function getAllNeighbour(
    position: [number, number],
    matrixSize: number,
    matrixNeighbour: [number, number][] = [
        [1, 1],
        [1, 0],
        [0, 1],
        [-1, -1],
        [-1, 0],
        [0, -1],
        [1, -1],
        [-1, 1],
    ],
) {
    return matrixNeighbour
        .map((pos) => {
            const outBoundsCell =
                position[0] + pos[0] < 0 ||
                position[1] + pos[1] < 0 ||
                position[0] + pos[0] > matrixSize - 1 ||
                position[1] + pos[1] > matrixSize - 1;

            if (outBoundsCell) {
                return;
            }
            return [position[0] + pos[0], position[1] + pos[1]] as const;
        })
        .filter(filterUndefined);
}

function filterUndefined<T>(value: T | undefined): value is T {
    return value !== undefined;
}
