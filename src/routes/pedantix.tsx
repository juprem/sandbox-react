import { createFileRoute } from '@tanstack/react-router';
import { Pedantix } from '../components/Pedantix/Pedantix';

export const Route = createFileRoute('/pedantix')({ component: Pedantix });
