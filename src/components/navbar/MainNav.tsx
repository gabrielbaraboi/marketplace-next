import Link from 'next/link';
import Navigation from './Navigation';

// TODO this navigation links are hardcoded, make it dynamic by adding them to database and creating new from admin panel
const NavLinks = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Products',
        href: '/products',
    },
    {
        label: 'Orders',
        href: '/orders',
    },
    {
        label: 'Dashboard',
        href: '/dashboard',
    },
];

const MainNav = () => {
    return (
        <nav className='flex flex-row items-start gap-8 py-2'>
            <Navigation navLinks={NavLinks} />
        </nav>
    );
};

export default MainNav;
