import { procedure, router } from '@/server/trpc';
import { editClassSchema, newClassSchema } from '@/lib/validationSchema';
import { z } from 'zod';
import { prisma } from "@/db";

const classRouter = router({
  createClass: procedure.input(newClassSchema).mutation(async ({ input }) => {
    try {
      await prisma.classEvent.create({
        data: { ...input }
      })
    } catch (e) {
      console.log(e);
    }
  }),
  editClass: procedure.input(editClassSchema).mutation(async ({ input }) => {
    const { id, ...updatedClass } = input;
    try {
      console.log(input);
      await prisma.classEvent.update({
        where: {
          id,
        },
        data: {
          ...updatedClass
        }
      });
    } catch (e) {
      console.log(e);
    }
  }),
  getClasses: procedure
    .input(
      z.object({ ownerId: z.number(), date: z.date(), type: z.string() }),
    )
    .query(async ({ input }) => {
      const { date, ownerId, type } = input;

      const startDate = new Date(date.getTime());
      const endDate = new Date(date.getTime());

      if (type == 'month') {
        startDate.setDate(1);
        endDate.setDate(31);
      } else if (type == 'week') {
        endDate.setDate(startDate.getDate() + 6);
        startDate.setHours(0, 0, 0);
        endDate.setHours(23, 59, 59);
      } else if (type == 'day') {
        startDate.setHours(1, 0, 0);
        endDate.setHours(23, 59, 59);
      }

      try {
        return await prisma.classEvent
          .findMany({
            where: {
              ownerId: ownerId,
              startDate: { gte: startDate, lt: endDate },
            },
          })
      } catch(e){
        console.log(e)
      }
    }),
});

export default classRouter;
