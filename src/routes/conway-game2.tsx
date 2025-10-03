import { createFileRoute } from '@tanstack/react-router';
import { ConwayDashboard } from '../components/GameOfLife/GameOfLifeV2/ConwayDashboard';

export const Route = createFileRoute('/conway-game2')({ component: ConwayDashboard });
