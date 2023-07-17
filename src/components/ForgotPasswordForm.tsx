'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast, useToast } from '@/hooks/use-toast';
import { ForgotPasswordValidator } from '@/lib/validators/forgotPassword';
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { Mail } from 'lucide-react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export type ForgotPasswordData = z.infer<typeof ForgotPasswordValidator>;

const ForgotPasswordForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordData>({
        resolver: zodResolver(ForgotPasswordValidator),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit: SubmitHandler<ForgotPasswordData> = async (data) => {
        setIsLoading(true);

        const payload: ForgotPasswordData = {
            email: data.email,
        };

        await axios
            .post('/api/auth/reset-password', payload)
            .then((res) => {
                setIsLoading(false);
                console.log(res);
                toast({
                    title: 'Success',
                    description: 'Check your email for a reset link',
                    variant: 'success',
                });
            })
            .catch((err) => {
                setIsLoading(false);
                if (err instanceof AxiosError) {
                    if (err.response?.status === 404) {
                        return toast({
                            title: 'Error',
                            description: 'Email not found',
                            variant: 'destructive',
                        });
                    }
                }
                toast({
                    title: 'Error',
                    description: 'There was an error resetting your password',
                    variant: 'default',
                });
            });
    };

    return (
        <div className={'flex flex-col justify-center gap-2 px-10'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col space-y-1'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        type='email'
                        id='email'
                        placeholder='Email'
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className='text-sm text-red-500'>
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <Button
                    type='submit'
                    size='sm'
                    className='mt-2 w-full'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                    ) : (
                        <Mail className='mr-2 h-4 w-4' />
                    )}
                    Send reset link
                </Button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
