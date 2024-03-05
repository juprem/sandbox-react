import { BaseSweeperCell, EmptyCell, NumberOfMineCell } from '../models/cell';
import { BaseGridCell, CellCoordinate, GridGenerator } from '../../iterator/GridGenerator';

function generateMines(nbMine: number, gridSize: number): CellCoordinate[] {
    let mines: { x: number; y: number }[] = [];

    for (let i = 0; i < nbMine; i++) {
        let randomMine: { x: number; y: number };

        do {
            randomMine = {
                x: Math.floor(Math.random() * (gridSize - 1)),
                y: Math.floor(Math.random() * (gridSize - 1)),
            };
        } while (mines.some((mine) => mine.x == randomMine.x && mine.y == randomMine.y));

        mines.push(randomMine);
    }

    return mines;
}

export function generateGrid(nbMine: number, gridSize: number): BaseSweeperCell[][] {
    const mines = generateMines(nbMine, gridSize);

    const cellMineTransformer = ({ x, y, neighbors }: BaseGridCell) => {
        const isMine = mines.some((mine) => mine.x == x && mine.y == y);

        const type = isMine ? 'MINE' : 'EMPTY';

        return { x, y, status: 'HIDDEN', type, neighbors } satisfies BaseSweeperCell;
    };

    const grid = [...new GridGenerator(gridSize, cellMineTransformer)];

    return grid.map((cells) =>
        cells.map((cell) => {
            if (cell.type === 'MINE') {
                return cell;
            }
            let numberOfMine = 0;

            cell.neighbors.forEach((neighbor) => {
                if (grid[neighbor.x][neighbor.y].type == 'MINE') {
                    return numberOfMine++;
                }
            });

            if (numberOfMine == 0) {
                return { ...cell, type: 'EMPTY' } satisfies EmptyCell;
            }

            return { ...cell, numberOfMine, type: 'NUMBER' } satisfies NumberOfMineCell;
        }),
    );
}