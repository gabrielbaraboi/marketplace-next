import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';
import { getSession } from 'next-auth/react';
import { SignUpValidator } from '@/lib/validators/signUp';
import { z } from 'zod';

export async function POST(request: Request, response: Response) {
    try {
        const session = await getSession();
        if (session) {
            return NextResponse.redirect('/');
        }

        const body = await request.json();
        const { email, name, password, confirmPassword } =
            SignUpValidator.parse(body);

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (user) {
            return new Response('User already exists', {
                status: 409,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
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
