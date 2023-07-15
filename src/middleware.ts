import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const privateRoutes = ['/dashboard'];

const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });

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
