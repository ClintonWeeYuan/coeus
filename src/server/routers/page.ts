import { procedure, router } from '@/server/trpc';
import { z } from 'zod';
import { prisma } from "@/db";

const pageRouter = router({
  createPage: procedure.input(z.object({
    title: z.string(),
    ownerId: z.number(),
    content: z.string()
  })).mutation(async ({ input }) => {
    try {
      return await prisma.page.create({ data: input });
    } catch (e) {
      console.log(e);
    }
  }),
  getAllPages: procedure.input(z.number()).query(async ({ input }) => {
    try {
      const res = await prisma.page.findMany({
        where: {
          ownerId: input
        }
      });
      console.log(res)
      return res;
    } catch (e) {
      console.log(e)
    }
  }),
  getPage: procedure.input(z.number()).query(async ({ input }) => {

    try {
      const res = await prisma.page.findUnique({ where: { id: input } })
      console.log(res)
      return res;
    } catch (e) {
      console.log(e)
    }
  }),
  updatePage: procedure.input(z.object({
    ownerId: z.number(),
    pageId: z.number(),
    content: z.any(),
    title: z.string()
  })).mutation(async ({ input }) => {
    const { pageId, ...newData } = input;
    try {
      console.log(newData)
      const res = await prisma.page.update({
        where: { id: pageId },
        data: newData
      });
      console.log(res)
      return res;
    } catch (e) {
      console.log(e)
    }
  })


  // editClass: procedure.input(editClassSchema).mutation(async ({ input }) => {
  //     try {
  //         console.log(input);
  //         await classModel().updateOne(
  //             { _id: input.id },
  //             {
  //                 ...input,
  //             },
  //         );
  //     } catch (e) {
  //         console.log(e);
  //     }
  // }),
  // getClasses: procedure
  //     .input(
  //         z.object({ owner: z.string(), date: z.date(), type: z.string() }),
  //     )
  //     .query(async ({ input }) => {
  //         const { date, owner, type } = input;
  //
  //         const startDate = new Date(date.getTime());
  //         const endDate = new Date(date.getTime());
  //
  //         if (type == 'month') {
  //             startDate.setDate(1);
  //             endDate.setDate(31);
  //         } else if (type == 'week') {
  //             endDate.setDate(startDate.getDate() + 6);
  //             startDate.setHours(0, 0, 0);
  //             endDate.setHours(23, 59, 59);
  //         } else if (type == 'day') {
  //             startDate.setHours(1, 0, 0);
  //             endDate.setHours(23, 59, 59);
  //         }
  //
  //         const res = await classModel()
  //             .find({
  //                 owner: owner,
  //                 startTime: { $gte: startDate, $lte: endDate },
  //             })
  //             .lean();
  //
  //         const formattedRes: IClass[] = [];
  //
  //         for (const classEvent of res) {
  //             const { owner, _id, ...others } = classEvent;
  //             formattedRes.push({
  //                 id: _id.toString(),
  //                 owner: owner.toString(),
  //                 ...others,
  //             });
  //         }
  //
  //         console.log(
  //             `Classes from ${dayjs(startDate).format(
  //                 simpleDateTimeFormat,
  //             )} to ${dayjs(endDate).format(simpleDateTimeFormat)}`,
  //         );
  //         console.log(formattedRes);
  //         return formattedRes;
  //     }),
});

export default pageRouter;
