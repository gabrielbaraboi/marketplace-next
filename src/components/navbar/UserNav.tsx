'use client';

import Link from 'next/link';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';
import { Button } from '../ui/button';
import { UserAvatar } from './UserAvatar';
import { LogOut } from 'lucide-react';

interface UserNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Pick<User, 'name' | 'email' | 'image'>;
}

export function UserNav({ user }: UserNavProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    className='relative h-8 w-8 rounded-full'
                >
                    <UserAvatar
                        user={{
                            name: user.name || null,
                            image: user.image || null,
                        }}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium leading-none'>
                            {user.name}
                        </p>
                        <p className='text-xs leading-none text-muted-foreground'>
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        {/* TODO create dashboard */}
                        <Link href={'/dashboard'}>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        {/* TODO create profile */}
                        <Link href={'/profile'}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        {/* TODO create orders */}
                        <Link href={'/orders'}>Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        {/* TODO create billing */}
                        <Link href={'/'}>Billing</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        {/* TODO create settings */}
                        <Link href={'/settings'}>Settings</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className='cursor-pointer'
                    onSelect={(event) => {
                        event.preventDefault();
                        signOut({
                            callbackUrl: `${window.location.origin}/sign-in`,
                        });
                    }}
                >
                    Sign out
                    <LogOut className='ml-2 h-4 w-4 text-red-400' />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
