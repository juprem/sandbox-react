import { publicProcedure, TRPCRouter } from '../init';
import { prisma } from '../../../db';

export const taskRouter = TRPCRouter({
  getAllTasks: publicProcedure.query(() => {
    return prisma.tasks.findMany();
  }),
});
