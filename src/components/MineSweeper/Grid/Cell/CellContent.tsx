import { BaseSweeperCell, isNumberOfMineCell } from '../../models/cell';
import Mine from '@assets/mine.svg';
import Flag from '@assets/flag.svg';

interface CellContentProps {
    cell: BaseSweeperCell;
}

const colorNumber: Record<number, string> = {
    1: '#1ff41f',
    2: '#ffc400',
    3: '#00d9ff',
    4: '#0004ff',
    5: '#9900ff',
    6: '#ff6a00',
    7: '#ff0000',
    8: '#652700',
};

export function CellContent({ cell }: CellContentProps) {
    if (cell.status == 'FLAGGED') {
        return <img src={Flag} alt="flag" />;
    }

    if (cell.status == 'HIDDEN') {
        return null;
    }

    if (cell.type == 'MINE') {
        return <img src={Mine} alt="mine" />;
    }

    if (isNumberOfMineCell(cell)) {
        return <div style={{ color: colorNumber[cell.numberOfMine] }}>{cell.numberOfMine}</div>;
    }

    return <></>;
}
