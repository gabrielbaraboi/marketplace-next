import NextAuth, { User } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        id: string;
        user: User & {
            role: string;
        };
    }
    interface User {
        role: string;
    }
}
