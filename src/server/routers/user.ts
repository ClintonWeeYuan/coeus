import { z } from 'zod';
import userModel from '@/models/user.model';
import { procedure, router } from '@/server/trpc';
import bcrypt from 'bcrypt';

const userRouter = router({
    hello: procedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return { greeting: `Hello ${input.text}` };
        }),
    createUser: procedure
        .input(
            z.object({
                firstName: z.string(),
                lastName: z.string(),
                email: z.string(),
                password: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            const { firstName, lastName, email, password } = input;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const userModelData = await userModel().create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });

            return { user: userModelData };
        }),
});

export default userRouter;
