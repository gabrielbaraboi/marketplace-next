import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    return (
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
                <h1 className='text-2xl font-semibold tracking-tight'>
                    Forgot password
                </h1>
                <p className='text-sm text-muted-foreground'>
                    Enter your email below to reset your password
                </p>
            </div>
            <ForgotPasswordForm />
        </div>
    );
};

export default page;
