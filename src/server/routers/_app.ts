import { router } from "@/server/trpc";
import userRouter from "@/server/routers/userRouter";

export const appRouter = router({
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
