import { css } from '@styled-system/css';
import { createGrid } from './utils/createGrid';
import { useEventListener } from '@hooks/useEventListener';
import { Cell } from './Cell';
import { useSudokuStore } from './hooks/useSudokuStore';
import { Button } from 'antd';
import { setUpBis } from './utils/gridCalculator';
import { CalculateCell } from './CalculateCell';

const calculateGrid = createGrid(9);
const baseGrid = Array.from({ length: 9 }, (_, i) => Array.from({ length: 9 }, (_, j) => ({ x: i, y: j })));

export function Sudoku() {
  const setManualCellNumber = useSudokuStore((state) => state.setManualCellNumber);
  const reset = useSudokuStore((state) => state.reset);

  useEventListener({
    eventType: 'keydown',
    listener: (event) => {
      const strokeKey = Number(event.key);

      const canUpdateCell = !Number.isNaN(strokeKey) && strokeKey <= calculateGrid.length;

      if (canUpdateCell) {
        setManualCellNumber(strokeKey, calculateGrid);
      }
    },
  });

  return (
    <>
      <div className={css({ display: 'flex', gap: '1rem' })}>
        <div
          className={css({
            display: 'grid',
          })}
          style={{ gridTemplateColumns: `repeat(${baseGrid.length}, 50px)` }}
        >
          {baseGrid
            .flatMap((row) => row)
            .map((cell, i) => (
              <Cell key={i} x={cell.x} y={cell.y} size={9} />
            ))}
        </div>
        <div
          className={css({
            display: 'grid',
          })}
          style={{ gridTemplateColumns: `repeat(${baseGrid.length}, 50px)` }}
        >
          {calculateGrid
            .flatMap((row) => row)
            .map((cell, i) => (
              <CalculateCell key={i} cell={cell} />
            ))}
        </div>
      </div>
      <Button
        onClick={() => {
          console.log(
            setUpBis(
              calculateGrid.flatMap((r) => r.map((c) => ({ x: c.x, y: c.y, cellNumber: c.cellNumber }))),
              9,
            ),
          );
        }}
      >
        Calculate
      </Button>
      <Button onClick={() => reset()}>Reset</Button>
    </>
  );
}
