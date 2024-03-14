import { CellMeasurer, CellMeasurerCache, createMasonryCellPositioner, Masonry } from 'react-virtualized';
import { MasonryCellProps } from 'react-virtualized/dist/es/Masonry';

interface MasonryTestProps {
    nbIColumn: number;
}

export function MasonryTest({}: MasonryTestProps) {
    // Array of images with captions
    const list = Array.from({ length: 10000 }, (_, index) => index);

    // Default sizes help Masonry decide how many images to batch-measure
    const cache = new CellMeasurerCache({
        defaultHeight: 250,
        defaultWidth: 200,
        fixedWidth: true,
    });

    // Our masonry layout will use 3 columns with a 10px gutter between
    const cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: cache,
        columnCount: 4,
        columnWidth: 195,
        spacer: 10,
    });

    function cellRenderer({ index, key, parent, style }: MasonryCellProps) {
        const datum = list[index];

        return (
            <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
                <div style={style}>
                    <h4>{datum}</h4>
                </div>
            </CellMeasurer>
        );
    }

    return (
        <Masonry
            cellCount={list.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={cellRenderer}
            height={600}
            width={800}
            autoHeight={false}
        />
    );
}
