import { useInfiniteScrolling } from './useInfiniteScrolling';
import { css } from '@styled-system/css';
import { InfiniteScrollingCard } from './InfiniteScrollingCard';
import { useIntersectionNextPage } from './useIntersectionNextPage';

export function InfiniteScrolling() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteScrolling();

    const ref = useIntersectionNextPage({ fetchNextPage });

    if (isPending) {
        return <div>Loading first page</div>;
    }

    const elements = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <div>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between' })}>
                {elements.map((item) => (
                    <InfiniteScrollingCard key={item} numbered={item} />
                ))}
            </div>
            {isFetchingNextPage ? 'Loading...' : null}
            {hasNextPage ? <div ref={ref} /> : 'No more pages'}
        </div>
    );
}
