import { createFileRoute } from '@tanstack/react-router';
import { MountingTestBase } from '../component/MountingTest/MoutingTestBase.tsx';

export const Route = createFileRoute('/mounting')({ component: MountingTestBase });
