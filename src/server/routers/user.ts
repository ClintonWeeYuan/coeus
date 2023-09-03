import { z } from 'zod';
import { procedure, router } from '@/server/trpc';
import bcrypt from 'bcrypt';
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const userRouter = router({
  getAllUsers: procedure.query(async () => {
    const users = await prisma.user.findMany();
    console.log(users)
    return users;
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
      try{
        const userModelData = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
          }
        });

        return { user: userModelData };
      } catch(e){
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (e.code === 'P2002') {
            console.log(
              'A user with this email already exists...'
            )
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'A user with this email already exists',
              // optional: pass the original error to retain stack trace
              cause: e,
            });
          }
        }
      }


    }),
});

export default userRouter;
