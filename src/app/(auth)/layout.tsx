import Logo from '@/components/navbar/Logo';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
            <Link
                href='/'
                className={cn(
                    buttonVariants({ variant: 'default' }),
                    'absolute right-4 top-4 md:right-8 md:top-4'
                )}
            >
                <ChevronLeft className='mr-2 h-4 w-4' />
                Home
            </Link>
            <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
                <div className='absolute inset-0 h-screen bg-gray-800' />
                <div className='relative z-20 flex items-center text-lg font-medium'>
                    <Logo />
                </div>
                <div className='relative z-20 mt-auto'>
                    <blockquote className='space-y-2'>
                        <p className='text-lg'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Sit nobis odio dolor amet dolorem doloribus
                            sapiente incidunt omnis quod at quo, suscipit
                            adipisci, ut alias provident veritatis quisquam
                            maiores? At?
                        </p>
                        <footer className='text-sm'>by Gabriel B.</footer>
                    </blockquote>
                </div>
            </div>
            <div className='lg:p-8'>{children}</div>
        </div>
    );
}
