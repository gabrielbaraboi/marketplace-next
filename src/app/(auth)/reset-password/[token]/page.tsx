import ResetPasswordForm from '@/components/ResetPasswordForm';

interface pageProps {
    params: {
        token: string;
    };
}

const page = async ({ params }: pageProps) => {
    const { token } = params;

    return (
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
                <h1 className='text-2xl font-semibold tracking-tight'>
                    Reset password
                </h1>
                <p className='text-sm text-muted-foreground'>
                    Enter your new password below
                </p>
            </div>
            <ResetPasswordForm token={token} />
        </div>
    );
};

export default page;
