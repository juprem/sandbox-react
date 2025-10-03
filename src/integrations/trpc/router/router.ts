import { TRPCRouter } from '../init';
import { calendarRouter } from './calendarRouter';
import { rdvRouter } from './rdvRouter';

export const trpcRouter = TRPCRouter({
    calendar: calendarRouter,
    rdv: rdvRouter
});

export type TRPCRouter = typeof trpcRouter;
