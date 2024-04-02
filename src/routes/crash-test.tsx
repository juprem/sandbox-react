import { createFileRoute } from '@tanstack/react-router';
import { CrashTest } from '../component/crashTest/CrashTest.tsx';

export const Route = createFileRoute('/crash-test')({
    component: CrashTest,
})