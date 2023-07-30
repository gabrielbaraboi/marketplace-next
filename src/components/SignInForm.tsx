'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Icons } from './Icons';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Input } from './ui/input';
import { redirect, useRouter } from 'next/navigation';
import { Label } from './ui/label';
import { SignInValidator } from '@/lib/validators/signIn';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export type SignInData = z.infer<typeof SignInValidator>;

const SignInForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInData>({
        resolver: zodResolver(SignInValidator),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const loginWithGoogle = async () => {
        setIsLoading(true);
        try {
            await signIn('google', { callbackUrl: '/' });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'There was an error logging in with Google',
                variant: 'default',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithFacebook = async () => {
        setIsLoading(true);
        try {
            await signIn('facebook', { callbackUrl: '/' });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'There was an error logging in with Facebook',
                variant: 'default',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit: SubmitHandler<SignInData> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
        }).then((callback) => {
            console.log(callback);

            setIsLoading(false);

            if (callback?.ok) {
                toast({
                    title: 'Success',
                    description: 'You have successfully logged in',
                    variant: 'success',
                });
                console.log('redirecting');
                router.refresh();
            }

            if (callback?.error) {
                console.log(callback);
                toast({
                    title: 'Error',
                    description: callback.error,
                    variant: 'destructive',
                });
            }
        });
    };

    return (
        <div className={'flex flex-col justify-center gap-2 px-10'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor='name'>Email</Label>
                <Input id='name' {...register('email')} type='email' />
                {errors?.email && (
                    <p className='px-1 text-xs text-red-600'>
                        {errors.email.message}
                    </p>
                )}
                <Label htmlFor='name'>Password</Label>
                <Input id='name' {...register('password')} type='password' />
                {errors?.password && (
                    <p className='px-1 text-xs text-red-600'>
                        {errors.password.message}
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
                        <Icons.user className='mr-2 h-4 w-4' />
                    )}
                    Continue with credentials
                </Button>
            </form>
            <div className='my-2 flex items-center justify-center'>
                <div className='h-px w-full bg-gray-300 dark:bg-gray-700' />
                <p className='px-4 text-sm text-muted-foreground'>Or</p>
                <div className='h-px w-full bg-gray-300 dark:bg-gray-700' />
            </div>

            <div className='flex flex-col items-center justify-center gap-3'>
                <Button
                    type='button'
                    size='sm'
                    className='w-full'
                    onClick={loginWithGoogle}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                    ) : (
                        <Icons.google className='mr-2 h-4 w-4' />
                    )}
                    Continue with Google
                </Button>
                <Button
                    type='button'
                    size='sm'
                    className='w-full'
                    onClick={loginWithFacebook}
                    disabled
                >
                    {isLoading ? (
                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                    ) : (
                        <Icons.facebook className='mr-2 h-4 w-4' />
                    )}
                    Continue with Facebook
                </Button>
            </div>
        </div>
    );
};

export default SignInForm;
