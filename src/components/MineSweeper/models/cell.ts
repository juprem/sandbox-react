import { CellCoordinate } from '../../iterator/GridGenerator';

export type CELL_STATUS = 'HIDDEN' | 'REVEALED' | 'FLAGGED';

export type BaseSweeperCell = {
    x: number;
    y: number;
    status: CELL_STATUS;
    type: string;
    neighbors: CellCoordinate[];
};

export type EmptyCell = BaseSweeperCell & {
    readonly type: 'EMPTY';
};

export type MineCell = BaseSweeperCell & {
    readonly type: 'MINE';
};

export type NumberOfMineCell = BaseSweeperCell & {
    readonly type: 'NUMBER';
    readonly numberOfMine: number;
};

export function isNumberOfMineCell(cell: BaseSweeperCell): cell is NumberOfMineCell {
    return cell.type == 'NUMBER';
}
