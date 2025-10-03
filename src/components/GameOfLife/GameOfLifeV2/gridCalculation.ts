import { CellCoordinate } from '../../iterator/GridGenerator';

export interface Cell {
    x: number;
    y: number;
    isAlive: boolean;
    hasChanged: boolean;
}

export function getNextCalculation(changeGrid: (Cell | undefined)[][], grid: Cell[][], neighborsStorage: CellCoordinate[][][]) {
    changeGrid.forEach((row) => {
        row.forEach((cell) => {
            if (!cell) return;

            const { isAlive, hasChanged } = getIsAlive(cell, grid, neighborsStorage);

            cell.isAlive = isAlive;
            cell.hasChanged = hasChanged;
        });
    });

    purgeCell(changeGrid, grid, neighborsStorage);

    changeGrid.forEach((row) =>
        row.forEach((cell) => {
            if (!cell) return;

            if (cell.hasChanged) {
                grid[cell.x][cell.y] = { ...cell, hasChanged: false };
            }
        }),
    );
}

export function hasNeighborsChanged(cell: Cell, grid: (Cell | undefined)[][], neighborsStorage: CellCoordinate[][][]) {
    return neighborsStorage[cell.x][cell.y].some(({ x, y }) => grid[x][y] && grid[x][y].hasChanged);
}

export function purgeCell(changeGrid: (Cell | undefined)[][], grid: Cell[][], neighborsStorage: CellCoordinate[][][]) {
    changeGrid.forEach((row) =>
        row.forEach((cell) => {
            if (!cell) return;

            if (!cell.hasChanged && !hasNeighborsChanged(cell, changeGrid, neighborsStorage)) {
                changeGrid[cell.x][cell.y] = undefined;
            }

            if (cell.hasChanged) {
                neighborsStorage[cell.x][cell.y].forEach(({ x, y }) => {
                    if (!changeGrid[x][y]) {
                        changeGrid[x][y] = { ...grid[x][y], hasChanged: false };
                    }
                });
            }
        }),
    );
}

export function getIsAlive(
    cell: Cell,
    oldGrid: Cell[][],
    neighborsStorage: CellCoordinate[][][]
) {
    const { isAlive } = cell;
    const allAroundCell = getAllAroundAliveCell(cell, oldGrid, neighborsStorage);

    const stillAlive = isAlive && allAroundCell > 1 && allAroundCell < 4;
    const becomeAlive = !isAlive && allAroundCell === 3;

    if (becomeAlive || stillAlive) {
        return { isAlive: true, hasChanged: becomeAlive };
    }

    return { isAlive: false, hasChanged: isAlive };
}

export function getAllAroundAliveCell(cell: Cell, cells: Cell[][], neighborsStorage: CellCoordinate[][][]) {
    let nAlive = 0;

    for (const c of neighborsStorage[cell.x][cell.y]) {
        nAlive += cells[c.x][c.y].isAlive ? 1 : 0;
    }

    return nAlive;
}
