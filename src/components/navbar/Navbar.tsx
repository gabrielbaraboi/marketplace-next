import Container from '../Container';
import Logo from './Logo';
import SearchBar from './SearchBar';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { UserNav } from './UserNav';
import { buttonVariants } from '../ui/button';
import MainNav from './MainNav';

const Navbar = async () => {
    // const session = await getServerSession(); // TODO: get user session
    const session = {
        user: {
            name: 'John Doe',
            email: 'test@.gmail.com',
            image: '/avatar.jpg',
        },
        // user: null,
    };

    return (
        <header className='fixed top-0 z-10 h-fit w-full bg-gray-800 shadow-sm'>
            <Container>
                <div className='flex flex-col'>
                    <div className='flex h-16 items-center justify-between'>
                        <Logo />
                        <SearchBar />
                        {session?.user ? (
                            <UserNav user={session.user} />
                        ) : (
                            <Link href='/sign-in' className={buttonVariants()}>
                                Sign In
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
