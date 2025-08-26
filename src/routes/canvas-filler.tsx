import { createFileRoute } from '@tanstack/react-router';
import { Canvas } from '../components/Canvas/Canvas';

export const Route = createFileRoute('/canvas-filler')({ component: Canvas });
