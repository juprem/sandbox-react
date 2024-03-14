import { AutoSizer, List, ListRowProps } from 'react-virtualized';

/*interface VirtualListTestProps {
    renderItem: (item: any) => ReactNode;
    gutter: number;
    data: any[];
    itemHeight: number;
    itemWidth: number;
}*/

export function VirtualListTest() {
    const items = Array.from({ length: 3000 }, (_, index) => index);

    const rowRenderer = (props: ListRowProps) => {
        const { key, index, style } = props;

        return (
            <div key={key} style={style}>
                {index}-{items[index]}
            </div>
        );
    };

    return (
        <AutoSizer>
            {({ width, height }) => (
                <List
                    width={width}
                    height={height}
                    rowHeight={20}
                    rowRenderer={rowRenderer}
                    rowCount={items.length}
                    overscanRowCount={3}
                />
            )}
        </AutoSizer>
    );
}
