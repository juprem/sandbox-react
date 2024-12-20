import { createFileRoute } from '@tanstack/react-router';
import { CrashTest } from '../components/crashTest/CrashTest';

export const Route = createFileRoute('/crash-test')({
    component: CrashTest,
});
