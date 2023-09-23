import { procedure, router } from '@/server/trpc';
import { z } from 'zod';
import { prisma } from "@/db";

const scheduleRouter = router({
  updateSchedule: procedure.input(z.object({
    title: z.string(),
    schedule: z.string(),
    timezone: z.string(),
    ownerId: z.number()
  })).mutation(async ({ input }) => {
    try {
      return await prisma.weekSchedule.upsert({
        where: {
          ownerId: input.ownerId
        },
        update: input,
        create: input });
    } catch (e) {
      console.log(e);
    }
  }),
  getSchedule: procedure.input(z.number()).query(async ({ input }) => {

    try {
      const res = await prisma.weekSchedule.findUnique({ where: { ownerId: input } })
      console.log(res)
      return res;
    } catch (e) {
      console.log(e)
    }
  }),
});

export default scheduleRouter;
