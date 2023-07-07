import Link from 'next/link';

const MainNav = () => {
    return (
        <nav className='flex flex-row items-start gap-8 py-2'>
            <Link
                href={'/'}
                className='rounded-md bg-gray-900 px-3 py-2 transition-all hover:bg-gray-700'
            >
                Home
            </Link>
            <Link
                href={'/'}
                className='rounded-md px-3 py-2 text-gray-300 transition-all hover:bg-gray-700 hover:text-white'
            >
                Products
            </Link>
            <Link
                href={'/'}
                className='rounded-md px-3 py-2 text-gray-300 transition-all hover:bg-gray-700 hover:text-white'
            >
                Orders
            </Link>
            <Link
                href={'/'}
                className='rounded-md px-3 py-2 text-gray-300 transition-all hover:bg-gray-700 hover:text-white'
            >
                Dashboard
            </Link>
        </nav>
    );
};

export default MainNav;
