import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

const privateRoutes = ['/dashboard', '/settings', '/profile'];

const publicRoutes = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
];

export async function middleware(req: NextRequest, res: NextResponse) {
    const token = await getToken({
        req,
        raw: true,
    });

    if (token) {
        if (publicRoutes.includes(req.nextUrl.pathname)) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    if (!token) {
        if (privateRoutes.includes(req.nextUrl.pathname)) {
            return NextResponse.redirect(new URL('/sign-in', req.url));
        }
    }
}
