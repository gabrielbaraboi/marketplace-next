'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ResetPasswordValidator } from '@/lib/validators/forgotPassword';
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { Lock } from 'lucide-react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

export type ResetPasswordData = z.infer<typeof ResetPasswordValidator>;

interface ResetPasswordFormProps {
    token: string;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ token }) => {
    const { toast } = useToast();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordData>({
        resolver: zodResolver(ResetPasswordValidator),
        defaultValues: {
            password: '',
            confirmPassword: '',
            token: token,
        },
    });

    const { mutate: resetPassword, isLoading } = useMutation({
        mutationFn: async ({
            password,
            confirmPassword,
            token,
        }: ResetPasswordData) => {
            const payload: ResetPasswordData = {
                password,
                confirmPassword,
                token,
            };

            const { data } = await axios.patch(
                '/api/auth/reset-password',
                payload
            );
            return data;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 404) {
                    return toast({
                        title: 'Error',
                        description: 'Token not found',
                        variant: 'destructive',
                    });
                }
            }

            return toast({
                title: 'Error',
                description: 'There was an error resetting your password',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Your password has been reset',
                variant: 'success',
            });
            router.push('/sign-in');
        },
    });

    return (
        <div className={'flex flex-col justify-center gap-2 px-10'}>
            <form onSubmit={handleSubmit((e) => resetPassword(e))}>
                <Label htmlFor='password'>Password</Label>
                <Input
                    type='password'
                    id='password'
                    placeholder='Password'
                    {...register('password')}
                />
                {errors.password && (
                    <p className='text-sm text-red-500'>
                        {errors.password.message}
                    </p>
                )}
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                    type='password'
                    id='confirmPassword'
                    placeholder='Confirm Password'
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                    <p className='text-sm text-red-500'>
                        {errors.confirmPassword.message}
                    </p>
                )}
                <Button
                    type='submit'
                    size='sm'
                    className='mt-2 w-full'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                    ) : (
                        <Lock className='mr-2 h-4 w-4' />
                    )}
                    Reset Password
                </Button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
