'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { SignUpValidator } from '@/lib/validators/signUp';
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

export type SignUpData = z.infer<typeof SignUpValidator>;

const SignUpForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpData>({
        resolver: zodResolver(SignUpValidator),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const { mutate: createUser, isLoading } = useMutation({
        mutationFn: async ({
            name,
            email,
            password,
            confirmPassword,
        }: SignUpData) => {
            const payload: SignUpData = {
                name,
                email,
                password,
                confirmPassword,
            };

            const { data } = await axios.post('/api/auth/signup', payload);
            return data;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 409) {
                    return toast({
                        title: 'Account already exists',
                        description: 'Please try again with a different email',
                        variant: 'destructive',
                    });
                }
            }
            return toast({
                title: 'Something went wrong.',
                description: 'Please try again later.',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'User created successfully',
                variant: 'default',
            });
            router.push('/sign-in');
        },
    });

    return (
        <div className='flex flex-col justify-center px-10'>
            <form onSubmit={handleSubmit((e) => createUser(e))}>
                <div className='flex flex-col space-y-4'>
                    <Label htmlFor='name'>Name</Label>
                    <Input id='name' {...register('name')} type='text' />
                    {errors?.name && (
                        <p className='px-1 text-xs text-red-600'>
                            {errors.name.message}
                        </p>
                    )}
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' {...register('email')} type='email' />
                    {errors?.email && (
                        <p className='px-1 text-xs text-red-600'>
                            {errors.email.message}
                        </p>
                    )}
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        id='password'
                        {...register('password')}
                        type='password'
                    />
                    {errors?.password && (
                        <p className='px-1 text-xs text-red-600'>
                            {errors.password.message}
                        </p>
                    )}
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input
                        id='confirmPassword'
                        {...register('confirmPassword')}
                        type='password'
                    />
                    {errors?.confirmPassword && (
                        <p className='px-1 text-xs text-red-600'>
                            {errors.confirmPassword.message}
                        </p>
                    )}
                    <Button type='submit' isLoading={isLoading}>
                        Sign Up
                    </Button>
                </div>
            </form>
            {/* if you have an account */}
            <div className='mt-4 flex flex-col items-center'>
                <p className='text-sm text-muted-foreground'>
                    Already have an account?
                </p>
                <Link
                    href='/auth/sign-in'
                    className='text-sm text-primary underline'
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
};

export default SignUpForm;
