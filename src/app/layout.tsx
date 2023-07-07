import Footer from '../components/footer';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

// TODO: add metadata
// TODO: create config file for metadata
export const metadata = {
    title: 'Marketplace',
    description: 'A marketplace for digital assets',
};

// TODO: add dark mode (theme provider)
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' className='dark text-slate-200'>
            <body
                className={cn(
                    'min-h-screen bg-gray-100 antialiased',
                    inter.className
                )}
            >
                <Navbar />
                <main className='flex min-h-screen flex-col items-center justify-between p-24'>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
