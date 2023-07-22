import { z } from "zod";
import userModel from "@/models/user.model";
import { procedure, router } from "@/server/trpc";

const userRouter = router({
  hello: procedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return { greeting: `Hello ${input.text}` };
  }),
  createUser: procedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { firstName, lastName, email } = input;
      const userModelData = await userModel().create({
        firstName,
        lastName,
        email,
      });
      return {
        greeting: userModelData,
      };
    }),
});

export default userRouter;
