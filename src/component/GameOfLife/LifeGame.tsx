import { css } from '../../../styled-system/css';
import { Cell } from './Cell.tsx';
import { useEffect, useState } from 'react';
import { calculateNextIteration, cleanUp, init } from './calculation.ts';
import { Button } from 'antd';

interface LifeGameProps {
    matrixSize: number;
    start: boolean;
    speedResolve: number;
}

export interface CellStatus {
    isAlive: 1 | 0;
    position: [number, number];
    age: number;
    neighbour: (readonly [number, number])[];
}

export function LifeGame({ matrixSize, start, speedResolve }: LifeGameProps) {
    const [cellTab, setCellTab] = useState(init(matrixSize));

    useEffect(() => {
        const intervalId = setInterval(() => {
            start && setCellTab((prevState) => calculateNextIteration(prevState));
        }, speedResolve);

        return () => clearInterval(intervalId);
    }, [start]);

    return (
        <>
            <Button onClick={() => setCellTab(cleanUp(cellTab))}>Clean</Button>
            <div
                className={css({
                    display: 'grid',
                })}
                style={{ gridTemplateColumns: `repeat(${matrixSize}, 10px)` }}
            >
                {cellTab
                    .flatMap((it) => it)
                    .map((it) => (
                        <Cell
                            isAlive={it.isAlive}
                            key={String(it.position)}
                            age={it.age}
                            setCellTab={() =>
                                setCellTab((prev) => {
                                    prev[it.position[0]][it.position[1]] = {
                                        isAlive: it.isAlive === 1 ? 0 : 1,
                                        position: it.position,
                                        age: 0,
                                        neighbour: it.neighbour
                                    };
                                    return prev.map((it) => it);
                                })
                            }
                        />
                    ))}
            </div>
        </>
    );
}
