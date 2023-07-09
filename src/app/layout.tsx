import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

// TODO: add metadata
// TODO: create config file for metadata
export const metadata = {
    title: 'Marketplace',
    description: 'A marketplace for digital assets',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' className='dark text-slate-200'>
            <body
                className={cn(
                    'min-h-screen bg-gray-900 antialiased',
                    inter.className
                )}
            >
                <Providers>{children}</Providers>

                <Toaster />
            </body>
        </html>
    );
}
