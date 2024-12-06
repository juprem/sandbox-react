import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

const item = Array.from({ length: 20 }).map((_, i) => ({ id: i, name: `jojo ${i}` }));

export function VirtualizedList() {
    const parentRef = useRef(null);
    const column = 14;

    const rowVirtualizer = useVirtualizer({
        count: item.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
        horizontal: true,
        overscan: 7,
        lanes: column,
    });

    console.log(rowVirtualizer.getVirtualItems());

    const percentage = column ? 100 / column : 100;

    return (
        <>
            <div
                ref={parentRef}
                className="List"
                style={{
                    height: `200px`,
                    overflow: 'auto',
                }}
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                        <div
                            key={virtualRow.key}
                            className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: `${virtualRow.lane * percentage}%`,
                                width: `${percentage}%`,
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            <div style={{ width: '100px' }}>{item[virtualRow.index].name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
