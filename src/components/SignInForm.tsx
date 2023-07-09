'use client';

import Link from 'next/link';
import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const SignInForm: FC<SignInFormProps> = ({ className, ...props }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loginWithGoogle = async () => {
        setIsLoading(true);
        try {
            await signIn('google');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'There was an error logging in with Google',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn('flex justify-center', className)} {...props}>
            <Button
                // isLoading={isLoading}
                type='button'
                size='sm'
                className='w-full'
                onClick={loginWithGoogle}
                disabled={isLoading}
            >
                {/* {isLoading ? null : <Icons.google className='mr-2 h-4 w-4' />} */}
                Google
            </Button>
        </div>
    );
};

export default SignInForm;
