import React from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='absolute inset-0'>
            <main className='mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-20'>
                {children}
            </main>
        </div>
    );
}
