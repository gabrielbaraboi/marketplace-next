import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';
import { getSession } from 'next-auth/react';
import { SignUpValidator } from '@/lib/validators/signUp';
import { z } from 'zod';

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (session) {
            return NextResponse.redirect('/');
        }

        const body = await request.json();
        const { email, name, password, confirmPassword } =
            SignUpValidator.parse(body);

        const checkUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (checkUser) {
            return new Response('User already exists', {
                status: 409,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        await prisma.account.create({
            data: {
                userId: user.id,
                type: 'credentials',
                provider: 'credentials',
                providerAccountId: user.id,
            },
        });

        return new Response('User created', {
            status: 201,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, {
                status: 400,
            });
        }

        return new Response(
            'Could not create account at this time. Please try again later',
            {
                status: 500,
            }
        );
    }
}
