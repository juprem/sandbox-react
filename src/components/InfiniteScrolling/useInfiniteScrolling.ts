import { useInfiniteQuery } from '@tanstack/react-query';

type Page = {
    data: number[];
    nextCursor?: number;
    prevCursor?: number;
};

async function queryFnInfinite({ pageParam }: { pageParam: number }) {
    return await new Promise<Page>((resolve) => {
        setTimeout(() => {
            const page = {
                data: Array.from({ length: 10 }, (_, i) => i + pageParam * 10),
                nextCursor: pageParam > 5 ? undefined : pageParam + 1,
                prevCursor: pageParam < - 5 ? undefined : pageParam - 1,
            } satisfies Page;

            resolve(page);
        }, 1000);
    });
}

export function useInfiniteScrolling() {
    return useInfiniteQuery({
        queryKey: ['infinite-scrolling'],
        queryFn: queryFnInfinite,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
}

export function useInfinitePage() {
    return useInfiniteQuery({
        queryKey: ['infinite-page'],
        queryFn: queryFnInfinite,
        initialPageParam: 0,
        getPreviousPageParam: (firstPage) => {
            console.log(firstPage, 'prev');

            return firstPage.prevCursor;
        },
        getNextPageParam: (lastPage) => {
            console.log(lastPage, 'next');

            return lastPage.nextCursor;
        },
    });
}
