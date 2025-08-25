import { getAllNeighbour } from '../GameOfLife/calculation';

export type CellCoordinate = { x: number; y: number };

export type BaseGridCell = { neighbors: CellCoordinate[] } & CellCoordinate;

export class GridGenerator<T = BaseGridCell> {
    readonly size: number;
    readonly transformer: ({ x, y, neighbors }: BaseGridCell) => T;

    constructor(
        size: number,
        transformer: ({ x, y, neighbors }: BaseGridCell) => T = ({ x, y, neighbors }) =>
            ({
                x,
                y,
                neighbors,
            }) as T,
    ) {
        this.size = size;
        this.transformer = transformer;
    }

    *[Symbol.iterator]() {
        for (let x = 0; x < this.size; x++) {
            const row: T[] = [];
            for (let y = 0; y < this.size; y++) {
                row.push({ ...this.transformer({ x, y, neighbors: getAllNeighbour([x, y], this.size) })});
            }
            yield row;
        }
    }
}
