import { TRPCRouter, publicProcedure } from '../init';
import { prisma } from '../../../db';
import { RdvCreateSchema } from '../../../components/Calendar/model/CalendarModel';
import { z } from 'zod';

export const rdvRouter = TRPCRouter({
    getAllRdvByDays: publicProcedure
        .input(
            z.object({
                day: z.number(),
                month: z.number(),
                year: z.number(),
            }),
        )
        .query(async ({ input}) => {
            return prisma.rdv.findMany({
              where: {
                day: {
                  month: input.month,
                  day: input.day,
                  year: input.year,
                },
              },
            });
        }),
    addRdv: publicProcedure.input(RdvCreateSchema).mutation(async ({ input }) => {
        let day = await prisma.day.findFirst({
            where: {
                month: input.day_month,
                day: input.day,
                year: input.day_year,
            },
        });

        if (!day) {
            day = await prisma.day.create({
                data: {
                    day: input.day,
                    month: input.day_month,
                    year: input.day_year,
                },
            });
        }

        return prisma.rdv.create({
            data: {
                start_hour: input.start_hour,
                end_hour: input.end_hour,
                name: input.name,
                day_id: day.id,
            },
        });
    }),
});