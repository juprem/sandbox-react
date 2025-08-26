import { createFileRoute } from '@tanstack/react-router';
import { Canvas } from '../components/Canvas/Canvas';
import { InfiniteLoadingContainer } from '../components/InfiniteScrolling/InfiniteLoadingContainer';

export const Route = createFileRoute('/infinite-loading')({ component: InfiniteLoadingContainer });
