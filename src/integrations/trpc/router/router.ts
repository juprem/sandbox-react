import { TRPCRouter } from '../init';
import { calendarRouter } from './calendarRouter';
import { rdvRouter } from './rdvRouter';
import { taskRouter } from './taskRouter';

export const trpcRouter = TRPCRouter({
  calendar: calendarRouter,
  rdv: rdvRouter,
  taskRouter: taskRouter,
});

export type TRPCRouter = typeof trpcRouter;
