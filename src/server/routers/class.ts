import classModel from '@/models/class.model';
import { procedure, router } from '@/server/trpc';
import { newClassSchema } from '@/lib/validationSchema';

const classRouter = router({
    createClass: procedure.input(newClassSchema).mutation(async ({ input }) => {
        try {
            console.log(input);
            const classModelData = await classModel().create(input);
            console.log(classModelData);
        } catch (e) {
            console.log(e);
        }
    }),
});

export default classRouter;
