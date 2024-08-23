import { createFileRoute } from '@tanstack/react-router';
import { ConwayGame } from '../component/GameOfLife/ConwayGame';

export const Route = createFileRoute('/conway-game')({ component: ConwayGame });
