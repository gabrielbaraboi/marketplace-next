import { FC } from 'react';
import SignInForm from '@/components/SignInForm';
import Link from 'next/link';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    return (
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
                <h1 className='text-2xl font-semibold tracking-tight'>
                    Sign in
                </h1>
                <p className='text-sm text-muted-foreground'>
                    Enter your credentials below to sign in your account
                </p>
            </div>
            <SignInForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
                No account?{' '}
                <Link
                    href='/sign-up'
                    className='underline underline-offset-4 hover:text-primary'
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default page;
