import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// interface InfiniteScrollingProps {}

export function InfiniteScrolling() {
    const [state, setState] = useState<number[]>(Array.from({ length: 30 }, (_, index) => index));

    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {setState(state.concat(Array.from({ length: 20 }, (_, index) => index)));}, 1500)
    };

    return (
        <div style={{ height: '100%', overflow: 'auto' }}>
            <h1>demo: react-infinite-scroll-component</h1>
            <hr />
            <InfiniteScroll
                height={500} // important
                next={fetchMoreData}
                hasMore
                loader={<>Loading...</>}
                dataLength={state.length}
            >
                {state.map((i, index) => (
                    <div style={{ height: 30, border: '1px solid green', margin: 6, padding: 8 }} key={index}>
                        div - #{i}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}