import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    return (
        //make me settings page with tailwind css
        <div className='flex flex-col justify-center gap-2 px-10'>
            <h1 className='text-3xl font-bold'>Settings</h1>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        className='rounded-md border border-gray-300 p-2'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        className='rounded-md border border-gray-300 p-2'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        className='rounded-md border border-gray-300 p-2'
                    />
                </div>
            </div>
            <button className='rounded-md bg-blue-500 p-2 text-white'>
                Save
            </button>
        </div>
    );
};

export default page;
