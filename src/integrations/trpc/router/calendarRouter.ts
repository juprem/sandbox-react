import { TRPCRouter, publicProcedure } from '../init';
import { prisma } from '../../../db';
import { CreateDaySchema } from '../../../components/Calendar/model/CalendarModel';
import { z } from 'zod';

export const calendarRouter = TRPCRouter({
    getAllDays: publicProcedure.query(async () => {
        return prisma.day.findMany();
    }),
    getDay: publicProcedure.input(z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
    })).query(async ({ input }) => {
       return prisma.day.findFirst({
           where: {
               day: input.day,
               month: input.month,
               year: input.year,
           },
       });
    }),
    createDay: publicProcedure.input(CreateDaySchema).mutation(async ({ input }) => {
        return prisma.day.create({
            data: {
                day: input.day,
                month: input.month,
                year: input.year,
            },
        });
    }),
});
