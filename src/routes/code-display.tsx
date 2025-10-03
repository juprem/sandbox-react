import { createFileRoute } from '@tanstack/react-router';
import { CodeDisplay } from '../components/CodeDisplay/CodeDisplay';

export const Route = createFileRoute('/code-display')({
    component: CodeDisplay,
});
