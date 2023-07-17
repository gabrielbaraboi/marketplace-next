import { z } from 'zod';

export const ForgotPasswordValidator = z.object({
    email: z.coerce
        .string()
        .email('Must be a valid email')
        .min(5, 'Email is required'),
});

export const ResetPasswordValidator = z
    .object({
        token: z.string().min(1, 'Token is required'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        // .regex(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        //     'Password must contain at least one number, one special character and one uppercase letter'
        // ),
        confirmPassword: z.string().min(1, 'You must confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: "Password don't match",
    });
