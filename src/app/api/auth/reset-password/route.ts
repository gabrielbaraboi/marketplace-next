import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';
import { getSession } from 'next-auth/react';
import * as crypto from 'crypto';
import {
    ForgotPasswordValidator,
    ResetPasswordValidator,
} from '@/lib/validators/forgotPassword';
import { z } from 'zod';
import { emailer, newUserPasswordResetTemplate } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (session) {
            return NextResponse.redirect('/');
        }

        const body = await request.json();
        const { email } = ForgotPasswordValidator.parse(body);

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return new Response('User not found', {
                status: 404,
            });
        }

        const token = crypto.randomBytes(20).toString('hex');

        await prisma.verificationToken.create({
            data: {
                identifier: email,
                token: token,
                expires: new Date(Date.now() + 10 * 60 * 1000),
            },
        });

        await emailer.sendEmail(
            newUserPasswordResetTemplate(email, user.name, token)
        );

        return new Response('Password reset email sent', {
            status: 200,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, {
                status: 400,
            });
        }

        return new Response(
            'Could not send password reset email at this time. Please try again later',
            {
                status: 500,
            }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();

        const { token, password, confirmPassword } =
            ResetPasswordValidator.parse(body);

        console.log({ token, password, confirmPassword });

        const verificationToken = await prisma.verificationToken.findUnique({
            where: {
                token: token,
            },
        });

        console.log({ verificationToken });

        if (!verificationToken) {
            return new Response('Invalid token', {
                status: 400,
            });
        }

        if (verificationToken.expires < new Date()) {
            console.log('Token expired');
            return new Response('Token expired', {
                status: 400,
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: verificationToken.identifier,
            },
        });

        if (!user) {
            console.log('User not found');
            return new Response('User not found', {
                status: 404,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.update({
            where: {
                email: verificationToken.identifier,
            },
            data: {
                password: hashedPassword,
            },
        });

        await prisma.verificationToken.delete({
            where: {
                token,
            },
        });

        await prisma.log.create({
            data: {
                userId: user.id,
                action: 'password-reset',
                details: JSON.stringify({
                    email: user.email,
                }),
            },
        });

        return new Response('Password updated', {
            status: 200,
        });
    } catch (error) {
        return new Response(
            'Could not reset your password at this time. Please try again later',
            {
                status: 500,
            }
        );
    }
}
