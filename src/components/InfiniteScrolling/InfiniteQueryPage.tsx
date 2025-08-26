import { useInfinitePage } from './useInfiniteScrolling';
import { css } from '@styled-system/css';
import { InfiniteScrollingCard } from './InfiniteScrollingCard';
import { Button } from 'antd';

export function InfiniteQueryPage() {
    const { data, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage, isPending } =
        useInfinitePage();

    if (isPending) {
        return <div>Loading first page</div>;
    }

    const elements = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' })}>
                {elements.map((item) => (
                    <InfiniteScrollingCard key={item} numbered={item} />
                ))}
            </div>
            <div className={css({ display: 'flex', gap: '1rem' })}>
                <Button onClick={() => fetchPreviousPage()} disabled={!hasPreviousPage}>
                    -1
                </Button>
                <div>{data?.pages.length}</div>
                <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
                    +1
                </Button>
            </div>
        </>
    );
}
