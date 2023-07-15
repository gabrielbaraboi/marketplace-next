import { z } from 'zod';

export const SignInValidator = z.object({
    email: z.coerce
        .string()
        .email('Must be a valid email')
        .min(5, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
});
