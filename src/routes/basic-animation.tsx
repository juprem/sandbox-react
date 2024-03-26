import { createFileRoute } from '@tanstack/react-router';
import { BasicAnimation } from '../component/MotionAnimation/BasicAnimation.tsx';

export const Route = createFileRoute('/basic-animation')({ component: BasicAnimation });
