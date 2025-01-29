import { css } from '../../../styled-system/css';
import { CellStatus } from './LifeGame';
interface CellProps extends Omit<CellStatus, 'position' | 'neighbour'> {
    setCellTab: () => void;
}

const colorMap = new Map([
    [0, '#ff0000'],
    [1, '#fd4502'],
    [2, '#ff5900'],
    [3, '#ff7300'],
    [4, '#ff9100'],
    [5, '#ffc400'],
    [6, '#ffdd00'],
]);
export function Cell({ isAlive, setCellTab, age }: CellProps) {
    return (
        <div
            role="button"
            className={css({
                height: '10px',
                width: '10px',
                border: 'solid 1px black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
            })}
            style={{ backgroundColor: isAlive ? colorMap.get(age > 6 ? 6 : age) : 'white' }}
            onClick={setCellTab}
        />
    );
}
