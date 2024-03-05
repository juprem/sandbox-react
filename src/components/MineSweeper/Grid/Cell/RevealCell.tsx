import { css } from '@styled-system/css';
import { motion } from 'framer-motion';
import { CellContent } from './CellContent';
import { BaseSweeperCell } from '../../models/cell';

interface CellProps {
    cell: BaseSweeperCell;
}

export function RevealCell({ cell }: CellProps) {
    const { status } = cell;

    return (
        <motion.div
            className={css({
                width: '80px',
                height: '80px',
                border: '1px solid gray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
            })}
            style={{ backgroundColor: status === 'REVEALED' ? '#faf8f8' : 'lightgray' }}
            whileHover={{
                backgroundColor: 'white',
            }}
            whileTap={{
                backgroundColor: 'gray',
            }}
        >
            <CellContent cell={cell} />
            {cell.x}{cell.y}
        </motion.div>
    );
}
