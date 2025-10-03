import styles from './ReactCssTree.module.scss';
import { Row } from './Row';

const t: BaseRowType = {
    content: '1',
    open: true,
    children: [
        {
            content: '1.1',
            open: true,
            children: [
                { content: '1.1.1', open: true, children: [] },
                { content: '1.1.4', open: true, children: [] },
                {
                    content: '1.1.2',
                    open: true,
                    children: [
                        { content: '1.1.2.1', open: true, children: [] },
                        { content: '1.1.2.2', open: true, children: [] },
                    ],
                },
                { content: '1.1.3', open: true, children: [] },
            ],
        },
        {
            content: '1.2',
            open: true,
            children: [
                { content: '1.2.1', open: true, children: [] },
                { content: '1.2.2', open: true, children: [] },
            ],
        },
    ],
};


export function ReactCssTree() {
    return (
        <ol className={styles.tree}>
            <Row item={t} />
        </ol>
    );
}
