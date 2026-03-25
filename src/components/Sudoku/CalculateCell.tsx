import { css } from '@styled-system/css';
import { getBorderColor } from './utils/getBorderColor';
import { CellSudoku } from './utils/createGrid';

interface CellProps {
  cell: CellSudoku;
}

export function CalculateCell({ cell }: CellProps) {
  const { x, y } = cell;
  const border = getBorderColor(x, y, 9);

  const bgColor = () => {
    if (!cell.isValid) {
      return '#e85757';
    }

    if (cell.isManualSet) return '#8bf18b';

    return 'lightgray';
  };

  return (
    <div
      className={css({
        height: '50px',
        width: '50px',
        color: 'black',
      })}
      style={{ backgroundColor: bgColor(), ...border }}
      id={`${cell.x} - ${cell.y} - div`}
    />
  );
}
