import { createFileRoute } from '@tanstack/react-router';
import { MineSweeper } from '../components/MineSweeper/MineSweeper';

export const Route = createFileRoute('/mine-sweeper')({
    component: MineSweeper,
});
