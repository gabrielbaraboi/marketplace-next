'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
    label: string;
    href: string;
};

type Props = {
    navLinks: NavLinkProps[];
};

const Navigation = ({ navLinks }: Props) => {
    const pathname = usePathname();

    return navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
            <Link
                key={link.label}
                href={link.href}
                className={cn(
                    'rounded-md px-3 py-2 transition-all',
                    isActive
                        ? 'bg-gray-900 text-white hover:bg-gray-700'
                        : 'text-gray-300  hover:bg-gray-700 hover:text-white'
                )}
            >
                {link.label}
            </Link>
        );
    });
};

export default Navigation;
