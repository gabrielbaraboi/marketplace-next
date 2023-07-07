import React from 'react';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center py-2'>
            <div className='flex min-h-screen flex-col items-center justify-center py-2'>
                <main>{children} 12312312</main>
            </div>
        </div>
    );
}
