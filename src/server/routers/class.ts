import classModel, { classZod } from '@/models/class.model';
import { procedure, router } from '@/server/trpc';

const classRouter = router({
    createClass: procedure.input(classZod).mutation(async ({ input }) => {
        const classModelData = await classModel().create(input);
        console.log(classModelData);
    }),
});

export default classRouter;
