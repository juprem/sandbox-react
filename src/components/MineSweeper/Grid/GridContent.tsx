import { GridActorContext } from '../statusHandling/gridStatushandling';
import { css } from '@styled-system/css';
import { Cell } from './Cell/Cell';
import { GridGenerator } from '../../iterator/GridGenerator';

function baseGridGenerator(gridLength: number) {
    return [...new GridGenerator(gridLength)];
}

export function GridContent() {
    const length = GridActorContext.useSelector((state) => state.context.gridLength);
    const baseGrid = baseGridGenerator(length);

    return (
        <div className={css({ display: 'flex', gap: '1rem' })}>
            <div
                className={css({
                    display: 'grid',
                })}
                style={{ gridTemplateColumns: `repeat(${length}, 50px)` }}
            >
                {baseGrid.flat().map((cell) => (
                    <Cell x={cell.x} y={cell.y} key={`${cell.x}-${cell.y}`} />
                ))}
            </div>
        </div>
    );
}
