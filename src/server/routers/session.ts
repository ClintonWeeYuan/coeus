import { procedure, router } from '@/server/trpc';
import { z } from 'zod';
import userModel from '@/models/user.model';
import bcrypt from 'bcrypt';
import { TRPCError } from '@trpc/server';
import { UserSession } from '@/lib/session';

const sessionRouter = router({
    login: procedure
        .input(z.object({ email: z.string().email(), password: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { email, password } = input;
            try {
                const user = await userModel().findOne({ email });
                console.log(user);

                if (!user || !(await bcrypt.compare(password, user.password))) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'Invalid email or password',
                    });
                }
                const res = {
                    isLoggedIn: true,
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                } as UserSession;

                ctx.session.user = res;

                await ctx.session.save();
                return res;
            } catch (e) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: (e as Error).message,
                });
            }
        }),
});

export default sessionRouter;
