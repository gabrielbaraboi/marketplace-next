import { User } from '@prisma/client';
// import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';

interface UserAvatarProps {
    user: Pick<User, 'name' | 'image'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
    return (
        <Avatar {...props} className='h-10 w-10'>
            {user.image ? (
                <div className='relative aspect-square h-full w-full'>
                    <Image
                        fill
                        src={user.image}
                        alt='profile picture'
                        referrerPolicy='no-referrer'
                    />
                </div>
            ) : (
                <AvatarFallback className='bg-white text-lg font-semibold text-gray-800'>
                    {user.name
                        ?.split(' ')
                        .map((word) => word.charAt(0))
                        .join('')}
                </AvatarFallback>
            )}
        </Avatar>
    );
}
