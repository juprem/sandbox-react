import { Measure } from '@model/classnameModels';
import { ReactNode } from 'react';
import { Skeleton } from './Skeleton';

interface WithSkeletonProps {
    loading: boolean;
    children: ReactNode;
    height?: Measure;
    width?: Measure;
}

export function WithSkeleton({ loading, children, width = '200px', height = '150px' }: WithSkeletonProps) {
    const getWidth = Number(
        width.substring(0, width.indexOf('rem') === -1 ? width.indexOf('px') : width.indexOf('rem')),
    );

    return <>{loading ? <Skeleton width={width} height={height} getWidth={getWidth} /> : <>{children}</>}</>;
}
