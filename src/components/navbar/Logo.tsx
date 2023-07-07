'use client';
import Link from 'next/link';
import { Icons } from '../Icons';

const Logo = () => {
    return (
        <Link href='/' className='flex items-center gap-2' passHref>
            <Icons.logo className='h-8 w-8 fill-green-500' />
            <p className='hidden text-2xl font-bold text-zinc-200 md:block'>
                Marketplace
            </p>
        </Link>
    );
};

export default Logo;
