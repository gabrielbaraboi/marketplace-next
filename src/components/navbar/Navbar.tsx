'use client';

import Container from '../Container';
import Logo from './Logo';
import SearchBar from './SearchBar';

import Link from 'next/link';
import { UserNav } from './UserNav';
import { buttonVariants } from '../ui/button';
import MainNav from './MainNav';
import { LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

//TODO make navbar for mobile (add hamburger menu)

const Navbar = () => {
    const session = useSession();

    console.log(session);
    return (
        <header className='fixed inset-x-0 top-0 z-10 h-fit w-full bg-gray-800 shadow-sm'>
            <Container>
                <div className='flex flex-col'>
                    <div className='flex h-16 items-center justify-between'>
                        <Logo />
                        <SearchBar />
                        {session?.data?.user ? (
                            <UserNav user={session?.data?.user} />
                        ) : (
                            <Link
                                href='/sign-in'
                                className={cn(
                                    buttonVariants(),
                                    'right-4 top-4 md:right-8 md:top-8'
                                )}
                            >
                                Sign In
                                <LogIn className='ml-2 h-4 w-4' />
                            </Link>
                        )}
                    </div>
                    <hr className='h-[1px] border-t-0 bg-gray-600 opacity-100 dark:opacity-50' />
                    <MainNav />
                </div>
            </Container>
        </header>
    );
};

export default Navbar;
