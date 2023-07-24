import { router } from '@/server/trpc';
import userRouter from '@/server/routers/user';
import classRouter from '@/server/routers/class';

export const appRouter = router({
    user: userRouter,
    class: classRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
