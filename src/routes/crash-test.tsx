import { createFileRoute } from '@tanstack/react-router';
import { CrashTest } from '../component/crashTest/CrashTest';

export const Route = createFileRoute('/crash-test')({
    component: CrashTest,
    meta: () => [
        {
            title: 'crash-test',
        },
    ],
});
