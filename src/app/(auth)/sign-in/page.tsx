import { FC } from 'react';
import SignIn from '@/components/SignIn';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    return (
        <div className='absolute inset-0'>
            <div className='mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-20'>
                <SignIn />
            </div>
        </div>
    );
};

export default page;
