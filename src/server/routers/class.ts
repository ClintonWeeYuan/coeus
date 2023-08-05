import classModel from '@/models/class.model';
import { procedure, router } from '@/server/trpc';
import { editClassSchema, newClassSchema } from '@/lib/validationSchema';
import { z } from 'zod';
import { IClass } from '@/lib/types';

const classRouter = router({
    createClass: procedure.input(newClassSchema).mutation(async ({ input }) => {
        try {
            const newClass = await classModel().create(input);
            console.log(newClass);
        } catch (e) {
            console.log(e);
        }
    }),
    editClass: procedure.input(editClassSchema).mutation(async ({ input }) => {
        try {
            console.log(input);
            await classModel().updateOne(
                { _id: input.id },
                {
                    ...input,
                },
            );
        } catch (e) {
            console.log(e);
        }
    }),
    getClasses: procedure
        .input(
            z.object({ owner: z.string(), date: z.date(), type: z.string() }),
        )
        .query(async ({ input }) => {
            const { date, owner, type } = input;

            const startDate = new Date(date.getTime());
            const endDate = new Date(date.getTime());

            if (type == 'month') {
                startDate.setDate(1);
                endDate.setDate(31);
            } else if (type == 'week') {
                endDate.setDate(startDate.getDate() + 7);
            } else if (type == 'day') {
                startDate.setHours(1, 0, 0);
                endDate.setHours(24, 59, 59);
            }

            const res = await classModel()
                .find({
                    owner: owner,
                    startTime: { $gte: startDate, $lte: endDate },
                })
                .lean();

            const formattedRes: IClass[] = [];

            for (const classEvent of res) {
                const { owner, _id, ...others } = classEvent;
                formattedRes.push({
                    id: _id.toString(),
                    owner: owner.toString(),
                    ...others,
                });
            }

            return formattedRes;
        }),
});

export default classRouter;
