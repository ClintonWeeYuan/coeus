import type { IronSessionOptions } from 'iron-session';

export interface UserSession {
    id: string | null;
    firstName: string;
    lastName: string;
    email: string;
    isLoggedIn: boolean;
}

export const sessionOptions: IronSessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: 'coeus-iron-session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
    interface IronSessionData {
        user?: UserSession;
    }
}
