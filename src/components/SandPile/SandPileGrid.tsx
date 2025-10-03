import { css } from '@styled-system/css';
import { useEffect, useState } from 'react';
import { getAllNeighbour } from '../GameOfLife/calculation';
import { produce, WritableDraft } from 'immer';
import { CellCoordinate } from '../iterator/GridGenerator';

export interface SandGridCell {
    x: number;
    y: number;
    neighbor: readonly CellCoordinate[];
    piles: number;
}

const size = 5;

const bigGrid = () => {
    return Array.from(
        { length: size * size },
        (_, i): SandGridCell => ({
            x: i % size,
            y: Math.trunc(i / size),
            piles: 0,
            neighbor: getAllNeighbour([i % size, Math.trunc(i / size)], size, size, [
                [1, 0],
                [-1, 0],
                [0, -1],
                [0, 1],
            ]),
        }),
    );
};

const nextIter = (pos: () => void, speed: number) => setInterval(() => pos(), speed);

function calculatePiles(grid: SandGridCell[], position: number) {
    const cell = grid[position];
    if (cell.piles === 5) {
        cell.neighbor.forEach((neigh) => {
            const pos = neigh.x + neigh.y * size;
            grid[pos] = { ...grid[pos], piles: grid[pos].piles + 1 };
        });
        grid[position] = { ...cell, piles: 0 };
    }
}

function getNextGrid(grid: WritableDraft<SandGridCell>[]) {
    let xYCenter = [(size - 1) / 2, (size - 1) / 2];
    const starterListPos = xYCenter[0] + xYCenter[1] * size;

    grid[starterListPos] = { ...grid[starterListPos], piles: grid[starterListPos].piles + 1 };

    for (let i = 1; i <= size; i++) {
        const pos = xYCenter[0] + xYCenter[1] * size;
        calculatePiles(grid, pos);
        if (i % 2 === 0) {
            for (let j = 1; j < i; j++) {
                const posDown = xYCenter[0] + (xYCenter[1] + j) * size;
                const posLeft = xYCenter[0] - j + xYCenter[1] * size;
                calculatePiles(grid, posDown);
                calculatePiles(grid, posLeft);
            }
            xYCenter = [xYCenter[0] - i, xYCenter[1] + i];
        } else {
            for (let j = 1; j < i; j++) {
                const posUp = xYCenter[0] + (xYCenter[1] - j) * size;
                const posRight = xYCenter[0] + j + xYCenter[1] * size;
                calculatePiles(grid, posUp);
                calculatePiles(grid, posRight);
            }
            xYCenter = [xYCenter[0] + i, xYCenter[1] - i];
        }
    }
    return grid;
}

const pilesColor = ['#FFFFFF', '#ff0000', '#e66201', '#ffea00', '#22ff00'];

export function SandPileGrid() {
    const [grid, setGrid] = useState(() => bigGrid());

    useEffect(() => {
        const idInterval = nextIter(() => setGrid((prev) => produce(prev, getNextGrid)), 100);

        return () => clearInterval(idInterval);
    }, []);

    return (
        <div
            className={css({
                display: 'grid',
            })}
            style={{ gridTemplateColumns: `repeat(${5}, 30px)` }}
        >
            {grid.map((it) => (
                <div
                    key={it.x.toString() + it.y.toString()}
                    style={{
                        backgroundColor: pilesColor[it.piles],
                    }}
                    className={css({
                        height: '30px',
                        width: '30x',
                        border: '1px solid lightgray',
                        color: 'black',
                        fontSize: 10,
                    })}
                >
                    <div>{it.x}</div>
                    <div>{it.y}</div>
                </div>
            ))}
        </div>
    );
}
