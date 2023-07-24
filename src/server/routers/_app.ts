import { router } from '@/server/trpc';
import userRouter from '@/server/routers/user';
import classRouter from '@/server/routers/class';
import sessionRouter from '@/server/routers/session';

export const appRouter = router({
    user: userRouter,
    class: classRouter,
    session: sessionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
