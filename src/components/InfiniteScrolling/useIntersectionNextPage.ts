import { FetchNextPageOptions } from '@tanstack/react-query';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import { useEffect } from 'react';

interface IntersectionNextPageVariables {
    fetchNextPage: (options?: FetchNextPageOptions) => Promise<any>;
}

export function useIntersectionNextPage({ fetchNextPage }: IntersectionNextPageVariables) {
    const [ref, entry] = useIntersectionObserver();

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage();
        }
    }, [entry]);

    return ref;
}
