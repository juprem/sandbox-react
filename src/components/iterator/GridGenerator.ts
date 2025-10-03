import { getAllNeighbour } from '../GameOfLife/calculation';

export type CellCoordinate = { x: number; y: number };

export type BaseGridCell = { neighbors: CellCoordinate[] } & CellCoordinate;

export class GridGenerator<T = BaseGridCell> {
    readonly size: number;
    readonly transformer: ({ x, y, neighbors }: BaseGridCell) => T;

    constructor(
        width: number,
        transformer: ({ x, y, neighbors }: BaseGridCell) => T = ({ x, y, neighbors }) =>
            ({
                x,
                y,
                neighbors,
            }) as T,
    ) {
        this.size = width;
        this.transformer = transformer;
    }

    *[Symbol.iterator]() {
        for (let x = 0; x < this.size; x++) {
            const row: T[] = [];

            for (let y = 0; y < this.size; y++) {
                row[y] = this.transformer({ x, y, neighbors: getAllNeighbour([x, y], this.size) });
            }
            yield row;
        }
    }
}

export class MultiFormGridGenerator<T = BaseGridCell> {
    readonly width: number;
    readonly height: number;
    readonly transformer: ({ x, y, neighbors }: BaseGridCell) => T;

    constructor(
        width: number,
        height?: number,
        transformer: ({ x, y, neighbors }: BaseGridCell) => T = ({ x, y, neighbors }) =>
            ({
                x,
                y,
                neighbors,
            }) as T,
    ) {
        this.width = width;
        this.height = height ?? width;
        this.transformer = transformer;
    }

    *[Symbol.iterator]() {
        for (let x = 0; x < this.width; x++) {
            const row: T[] = [];

            for (let y = 0; y < this.height; y++) {
                row[y] = this.transformer({ x, y, neighbors: getAllNeighbour([x, y], this.width, this.height) });
            }
            yield row;
        }
    }
}
