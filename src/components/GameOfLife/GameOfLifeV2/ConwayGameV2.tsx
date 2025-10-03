import { useEffect, useRef } from 'react';
import { Cell, getNextCalculation } from './gridCalculation';
import { MultiFormGridGenerator } from '../../iterator/GridGenerator';

let ngrid: Cell[][] = [];
let changingGrid: (Cell | undefined)[][] = [];

const gosperGliderGun = [
    [24, 0],
    [22, 1], [24, 1],
    [12, 2], [13, 2], [20, 2], [21, 2], [34, 2], [35, 2],
    [11, 3], [15, 3], [20, 3], [21, 3], [34, 3], [35, 3],
    [0, 4], [1, 4], [10, 4], [16, 4], [20, 4], [21, 4],
    [0, 5], [1, 5], [10, 5], [14, 5], [16, 5], [17, 5], [22, 5], [24, 5],
    [10, 6], [16, 6], [24, 6],
    [11, 7], [15, 7],
    [12, 8], [13, 8],
];

interface ConwayGameV2Props {
    nbOfCellPerRow: number;
    nbOfRow: number;
    iterationPerSecond: number;
    scale: number;
    colors: string[];
}

export function ConwayGameV2({ nbOfCellPerRow, nbOfRow, iterationPerSecond, scale, colors }: ConwayGameV2Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasWidth = nbOfCellPerRow * scale;
    const canvasHeight = nbOfRow * scale;
    const neighborsStorage = [...new MultiFormGridGenerator(nbOfCellPerRow, nbOfRow, (cell) => cell.neighbors )];

    useEffect(() => {
        const canvas = canvasRef.current!;

        const ctx = canvas.getContext('2d', { alpha: false })!;

        ngrid = [
            ...new MultiFormGridGenerator(nbOfCellPerRow, nbOfRow, (cell) => ({
                x: cell.x,
                y: cell.y,
                isAlive: cell.x % 2 == 0,
                hasChanged: false,
            })),
        ];
        changingGrid = [
            ...new MultiFormGridGenerator(nbOfCellPerRow, nbOfRow, (cell) => ({
                x: cell.x,
                y: cell.y,
                isAlive: cell.x % 2 == 0,
                hasChanged: false,
            })),
        ];

        ngrid.forEach((cells) =>
            cells.forEach((cell) => {
                ctx.fillStyle = cell!.isAlive ? colors[0] : 'white';
                ctx.fillRect(cell!.x * scale, cell!.y * scale, scale, scale);
            }),
        );

        const intervalId = setInterval(async () => {
            changingGrid.forEach((cells) =>
                cells.forEach((cell) => {
                    if (!cell) return;

                    const color = colors[0];

                    ctx.fillStyle = cell.isAlive ? color : 'white';
                    ctx.fillRect(cell.x * scale, cell.y * scale, scale, scale);
                }),
            );

            getNextCalculation(changingGrid, ngrid, neighborsStorage);
        }, 1000 / iterationPerSecond);

        return () => clearInterval(intervalId);
    }, []);

    return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>;
}
