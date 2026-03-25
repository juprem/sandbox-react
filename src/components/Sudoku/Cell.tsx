import { useSudokuStore } from './hooks/useSudokuStore';
import { css } from '@styled-system/css';
import { getBorderColor } from './utils/getBorderColor';

interface CellProps {
  x: number;
  y: number;
  size: number
}

export function Cell({ x, y, size }: CellProps) {
    const cell = useSudokuStore((state) => state.grid[x][y]);
    const isActive = useSudokuStore((state) => state.activeCell?.x === x && state.activeCell?.y === y);
    const setActiveCell = useSudokuStore((state) => state.setActiveCell);

    const cellContent = cell.cellNumber != 0 ? cell.cellNumber : null;

    const border = getBorderColor(x, y, size);
    const bgColor = () => {
        if(!cell.isValid) {
            return isActive ? '#ef1d1d' : '#e85757';
        }

        if (cell.isManualSet) return isActive ? '#52ec52' : '#8bf18b'

        return isActive ? 'whitesmoke' : 'lightgray';
    }

    return (
        <button
            className={css({
                height: '50px',
                width: '50px',
                color: 'black',
            })}
            style={{ backgroundColor: bgColor(), ...border }}
            id={`${cell.x} - ${cell.y}`}
            onClick={() => setActiveCell({ x, y })}
        >
            {cellContent}
        </button>
    );
}
