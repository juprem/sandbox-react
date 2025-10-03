import { filterUndefined } from 'src/utils/filterUndefined';
import { CellStatus } from './LifeGame';
import { BaseGridCell, GridGenerator } from '../iterator/GridGenerator';

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
    return cell.neighbour.reduce((nAlive, { x: posx, y: posy }) => {
        const cellAlive = cells[posx][posy].isAlive ? 1 : 0;

        return nAlive + cellAlive;
    }, 0);
}

export function cleanUp(cells: CellStatus[][]): CellStatus[][] {
    return cells.map((it) => it.map((it2) => ({ ...it2, isAlive: false }) satisfies CellStatus));
}

function cellTransformer({ x, y, neighbors }: BaseGridCell) {
    return { neighbour: neighbors, age: 0, isAlive: y % 2 === 0, position: [x, y] } satisfies CellStatus;
}

export function init(matrixSize: number): CellStatus[][] {
    return [...new GridGenerator(matrixSize, cellTransformer)];
}

export function getAllNeighbour(
    position: [number, number],
    matrixWidth: number,
    matrixHeight?: number,
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
                position[0] + pos[0] > matrixWidth - 1 ||
                position[1] + pos[1] > (matrixHeight ?? matrixWidth) - 1;

            if (outBoundsCell) {
                return;
            }
            return { x: position[0] + pos[0], y: position[1] + pos[1] } as const;
        })
        .filter(filterUndefined);
}