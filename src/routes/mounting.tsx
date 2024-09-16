import { createFileRoute } from '@tanstack/react-router';
import { MountingTestBase } from '../components/MountingTest/MoutingTestBase';

export const Route = createFileRoute('/mounting')({ component: MountingTestBase });
