import '@/styles/globals.css';
import Navbar from '@/components/navbar/Navbar';

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='absolute inset-0'>
            <Navbar />
            <main className='mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-20'>
                {children}
            </main>
        </div>
    );
}
