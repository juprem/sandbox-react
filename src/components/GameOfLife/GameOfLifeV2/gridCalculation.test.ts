import { describe, test } from 'vitest';
import { GridGenerator } from '../../iterator/GridGenerator';
import {
    getAllAroundAliveCell,
    getIsAlive,
    getNextCalculation,
    hasNeighborsChanged,
    purgeCell,
} from './gridCalculation';

const gridTest = [
    ...new GridGenerator(1500, (cell) => ({
        ...cell,
        isAlive: cell.x % 2 === 0,
        hasChanged: Math.random() > 0.6,
    })),
];

const changedGrid = [
    ...new GridGenerator(1500, (cell) => {
        if (Math.random() > 0.6) {
            return {
                ...cell,
                isAlive: cell.x % 2 === 0,
                hasChanged: Math.random() > 0.6,
            };
        }

        return undefined;
    }),
];

const n = [
    ...new GridGenerator(1500, (cell) => {
        return cell.neighbors;
    }),
];

describe('benchmark', () => {
    test('Benchmark is all around alive function', () => {
        let timingList = 0;

        for (let i = 0; i < 100; i++) {
            const start = performance.now();
            gridTest.forEach((rows) => rows.forEach((cell) => getAllAroundAliveCell(cell, gridTest, n)));
            const end = performance.now();

            timingList += (end - start) / 1000;
        }

        console.log('getAllAroundAliveCell', timingList / 100);
    }, 100000);

    test('Benchmark is alive function', () => {
        let timingList = 0;

        for (let i = 0; i < 100; i++) {
            const start = performance.now();
            gridTest.forEach((rows) => rows.forEach((cell) => getIsAlive(cell, gridTest, n)));
            const end = performance.now();

            timingList += (end - start) / 1000;
        }

        console.log('getIsAlive', timingList / 100);
    }, 100000);

    test('Benchmark has neighbors changed function', () => {
        let timingList = 0;

        for (let i = 0; i < 10; i++) {
            const start = performance.now();
            gridTest.forEach((rows) => rows.forEach((cell) => hasNeighborsChanged(cell, gridTest, n)));
            const end = performance.now();

            timingList += (end - start) / 1000;
        }

        console.log('hasNeighborsChanged', timingList / 10);
    });

    test('Benchmark purgeCell function', () => {
        let timingList = 0;

        for (let i = 0; i < 10; i++) {
            const start = performance.now();
            purgeCell(changedGrid, gridTest, n);
            const end = performance.now();

            timingList += (end - start) / 1000;
        }

        console.log('purgeCell', timingList / 10);
    }, 1000000);

    test('Benchmark nextCalculation function', () => {
        let timingList = 0;

        for (let i = 0; i < 10; i++) {
            const start = performance.now();
            getNextCalculation(changedGrid, gridTest, n);
            const end = performance.now();

            timingList += (end - start) / 1000;
        }

        console.log('getNextCalculation', timingList / 10);
    }, 1000000);

    test('Benchmark grid generation', () => {
        let timingList = 0;

        const start = performance.now();
        const _ = [
            ...new GridGenerator(1000, (cell) => ({
                ...cell,
                isAlive: cell.x % 2 === 0,
                hasChanged: false,
            })),
        ];
        const end = performance.now();

        timingList += (end - start) / 1000;

        console.log('GridGenerator', timingList / 100);
    }, 1000000);
});
