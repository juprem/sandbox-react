import { createFileRoute } from '@tanstack/react-router';
import { Tetris } from '../components/Tetris/Tetris';

export const Route = createFileRoute('/tetris')({ component: Tetris });
