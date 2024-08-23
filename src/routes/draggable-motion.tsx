import { createFileRoute } from '@tanstack/react-router';
import { DraggableMotion } from '../component/MotionAnimation/DraggableMotion';

export const Route = createFileRoute('/draggable-motion')({
    component: DraggableMotion,
});
