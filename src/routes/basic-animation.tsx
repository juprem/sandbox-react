import { createFileRoute } from '@tanstack/react-router';
import { BasicAnimation } from '../components/MotionAnimation/BasicAnimation';

export const Route = createFileRoute('/basic-animation')({ component: BasicAnimation });
