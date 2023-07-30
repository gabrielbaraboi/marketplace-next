import bcrypt from 'bcryptjs';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/db';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { encode, decode } from 'next-auth/jwt';
import { cookies } from 'next/dist/client/components/headers';

export function auth(
    req: NextApiRequest,
    res: NextApiResponse
): NextAuthOptions {
    const nextCookies = cookies();
    console.log('QUERY', req.query);
    return NextAuth(req, res, {
        adapter: PrismaAdapter(prisma),
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            }),
            FacebookProvider({
                clientId: process.env.FACEBOOK_CLIENT_ID!,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
            }),
            EmailProvider({
                server: {
                    host: process.env.EMAIL_SERVER_HOST,
                    port: process.env.EMAIL_SERVER_PORT as unknown as number,
                    auth: {
                        user: process.env.EMAIL_SERVER_USER,
                        pass: process.env.EMAIL_SERVER_PASSWORD,
                    },
                },
                from: process.env.EMAIL_FROM,
            }),
            CredentialsProvider({
                name: 'credentials',
                credentials: {
                    email: { label: 'email', type: 'email' },
                    password: { label: 'password', type: 'password' },
                },
                async authorize(credentials, req) {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('Invalid credentials');
                    }

                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    });

                    if (!user || !user?.password) {
                        throw new Error('Invalid credentials');
                    }

                    const isCorrectPassword = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (!isCorrectPassword) {
                        throw new Error('Invalid credentials');
                    }

                    return user;
                },
            }),
        ],
        callbacks: {
            session({ session, user }) {
                if (session.user) {
                    session.user.id = user.id;
                    session.user.role = user.role as string;
                }
                return session;
            },
            jwt({ token, user }) {
                if (user) {
                    token.id = user.id;
                    token.role = user.role as string;
                }
                return token;
            },
            async signIn({ user }) {
                if (
                    // req.query?.nextauth?.includes('callback') &&
                    // req.query?.nextauth?.includes('credentials') &&
                    req.method === 'POST'
                ) {
                    if (user && 'id' in user) {
                        const sessionToken = randomUUID();
                        const maxAge = 30 * 24 * 60 * 60;
                        const sessionExpiry = new Date(
                            Date.now() + maxAge * 1000
                        );

                        await prisma.session.create({
                            data: {
                                sessionToken,
                                userId: user.id,
                                expires: sessionExpiry,
                            },
                        });
                        nextCookies.set(
                            // @ts-ignore
                            'next-auth.session-token',
                            sessionToken,
                            {
                                expires: sessionExpiry,
                            }
                        );
                    }
                }
                return true;
            },
        },
        jwt: {
            encode: async ({ token, secret, maxAge }) => {
                if (
                    // req.query?.nextauth?.includes('callback') &&
                    // req.query?.nextauth?.includes('credentials') &&
                    req.method === 'POST'
                ) {
                    const cookie = nextCookies.get('next-auth.session-token');
                    if (cookie) return cookie as any;
                }
                return encode({ token, secret, maxAge });
            },
            decode: async ({ token, secret }) => {
                if (
                    // req.query.nextauth?.includes('callback') &&
                    // req.query.nextauth?.includes('credentials') &&
                    req.method === 'POST'
                ) {
                    return null;
                }
                return decode({ token, secret });
            },
        },
        pages: {
            signIn: '/sign-in',
        },
        debug: process.env.NODE_ENV === 'development',
        session: {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            updateAge: 24 * 60 * 60, // 24 hours
        },
        secret: process.env.NEXTAUTH_SECRET,
    });
}

export { auth as GET, auth as POST };
