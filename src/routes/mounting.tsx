import { createFileRoute } from '@tanstack/react-router';
import { MountingTestBase } from '../component/MountingTest/MoutingTestBase';

export const Route = createFileRoute('/mounting')({ component: MountingTestBase });
