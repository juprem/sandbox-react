import { css } from '@styled-system/css';
import { createGrid, isAllowedNumber } from './utils/createGrid';
import { useEventListener } from '@hooks/useEventListener';
import { Cell } from './Cell';
import { useSudokuStore } from './hooks/useSudokuStore';
import { Button } from 'antd';
import { gridCalculator, useGridCalculator } from './utils/gridCalculator';

const calculateGrid = createGrid()

export function Sudoku() {
    const setCellNumber = useSudokuStore((state) => state.setCellNumber);
    const setActiveCell = useSudokuStore((state) => state.setActiveCell);
    const grid = useSudokuStore((state) => state.grid);

    useEventListener({
        eventType: 'keydown',
        listener: (event) => {
            const strokeKey = Number(event.key);

            const canUpdateCell =
                strokeKey > 0 && strokeKey < 10 && !Number.isNaN(strokeKey) && isAllowedNumber(strokeKey);
            if (canUpdateCell) {
                setCellNumber(strokeKey);
            }
        },
    });

    return (
        <>
            <div
                className={css({
                    display: 'grid',
                    gridTemplateColumns: 'repeat(9, 50px)',
                })}
            >
                {grid
                    .flatMap((row) => row)
                    .map((cell, i) => (
                        <Cell key={i} x={cell.x} y={cell.y} />
                    ))}
            </div>
            <Button onClick={() => gridCalculator(0, 0, calculateGrid, setCellNumber, setActiveCell)}>
                Calculate
            </Button>
        </>
    );
}
