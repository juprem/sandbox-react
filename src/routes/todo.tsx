import { createFileRoute } from '@tanstack/react-router';
import { Todo } from '../pages/Todo/Todo.tsx';

export const Route = createFileRoute('/todo')({ component: Todo });
