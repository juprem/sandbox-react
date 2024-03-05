import { css } from '@styled-system/css';
import { motion } from 'framer-motion';
import { GridActorContext } from '../../statusHandling/gridStatushandling';
import { CellContent } from './CellContent';
import { useCellListener } from '../../hooks/useCellListener';

interface CellProps {
    x: number;
    y: number;
}

export function Cell({ x, y }: CellProps) {
    const cell = GridActorContext.useSelector((state) => state.context.grid[x][y]);
    const ref = useCellListener({ x, y });

    const { status } = cell;

    return (
        <motion.div
            className={css({
                width: '20px',
                height: '20px',
                border: '1px solid gray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                fontSize: '10px',
            })}
            style={{ backgroundColor: status === 'REVEALED' ? '#faf8f8' : 'lightgray' }}
            whileHover={{
                backgroundColor: 'white',
            }}
            whileTap={{
                backgroundColor: 'gray',
            }}
            ref={ref}
        >
            <CellContent cell={cell} />
        </motion.div>
    );
}
