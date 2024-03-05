import { Measure } from '../../model/classnameModels';
import { Skeleton } from './Skeleton';

interface WithSkeletonProps {
    height?: Measure;
    width?: Measure;
}

export function WithSuspenseSkeleton({ width = '200px', height = '150px' }: WithSkeletonProps) {
    const getWidth = Number(
        width.substring(0, width.indexOf('rem') === -1 ? width.indexOf('px') : width.indexOf('rem')),
    );
    return <Skeleton height={height} width={width} getWidth={getWidth} />;
}
