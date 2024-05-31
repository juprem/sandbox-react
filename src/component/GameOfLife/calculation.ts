import { CellStatus } from './LifeGame.tsx';

export function calculateNextIteration(cells: CellStatus[][]): CellStatus[][] {
    return cells.map((it) =>
        it.map((it2): CellStatus => {
            const aroundCell = getAllAroundAliveCell(it2, cells);
            const nextStatus = getNextStatus(aroundCell, it2.isAlive, it2.age);
            return { position: it2.position, neighbour: it2.neighbour, ...nextStatus };
        }),
    );
}

function getNextStatus(allAroundCell: number, isAlive: 0 | 1, age: number): { isAlive: 0 | 1; age: number } {
    if (isAlive === 0 && allAroundCell === 3) return { isAlive: 1, age: 0 };
    if (isAlive === 1 && allAroundCell > 1 && allAroundCell < 4) return { isAlive: 1, age: age + 1 };
    return { isAlive: 0, age: 0 };
}

function getAllAroundAliveCell(cell: CellStatus, cells: CellStatus[][]): number {
    return cell.neighbour.reduce((nAlive, [posx, posy]) => {
        return nAlive + cells[posx][posy].isAlive;
    }, 0);
}

export function cleanUp(cells: CellStatus[][]): CellStatus[][] {
    return cells.map((it) => it.map((it2) => ({ ...it2, isAlive: 0 })));
}

export function init(matrixSize: number): CellStatus[][] {
    return Array.from({ length: matrixSize }, (_, index) => {
        return Array.from({ length: matrixSize }, (_, index2) => ({
            isAlive: (index2 + index * 10) % 2 === 0 ? 1 : 0,
            position: [index, index2],
            age: 0,
            neighbour: getAllNeighbour([index, index2], matrixSize),
        }));
    });
}

function getAllNeighbour(position: [number, number], matrixSize: number) {
    const matrixNeighbour = [
        [1, 1],
        [1, 0],
        [0, 1],
        [-1, -1],
        [-1, 0],
        [0, -1],
        [1, -1],
        [-1, 1],
    ];

    return matrixNeighbour
        .map((pos) => {
            if (
                position[0] + pos[0] < 0 ||
                position[1] + pos[1] < 0 ||
                position[0] + pos[0] > matrixSize - 1 ||
                position[1] + pos[1] > matrixSize - 1
            ) {
                return;
            }
            return [position[0] + pos[0], position[1] + pos[1]] as const;
        })
        .filter(filterUndefined);
}

function filterUndefined<T>(value: T | undefined): value is T {
    return value !== undefined;
}
