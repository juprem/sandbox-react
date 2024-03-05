import { createFileRoute } from '@tanstack/react-router';
import { XState } from '../components/xstate/XState';

export const Route = createFileRoute('/x-state')({ component: XState });
