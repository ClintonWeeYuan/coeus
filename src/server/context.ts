import { getIronSession } from 'iron-session';
import * as trpcNext from '@trpc/server/adapters/next';
import { sessionOptions } from '@/lib/session';
import { inferAsyncReturnType } from '@trpc/server';
import dbConnect from '@/clients/mongoose';

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
    const session = await getIronSession(opts.req, opts.res, sessionOptions);
    await dbConnect();
    return {
        session,
    };
}

export type Context = inferAsyncReturnType<typeof createContext>;
