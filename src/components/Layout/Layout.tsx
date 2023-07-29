import { FC, ReactNode } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Head from 'next/head';
import MobileSidebar from '@/components/Layout/MobileSidebar';
import { Inter, Roboto } from 'next/font/google';

interface Props {
    children: ReactNode;
}

const roboto = Roboto({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const Layout: FC<Props> = ({ children }) => {
    return (
        <div
            className={`h-screen md:grid md:grid-cols-5 md:gap-0 ${inter.variable} ${roboto.className}`}
        >
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <title>Coeus</title>
            </Head>

            <div className="hidden md:block">
                <Sidebar />
            </div>

            <div className="block md:hidden">
                <MobileSidebar />
            </div>

            <div className="md:col-span-4 py-4 px-4">{children}</div>
        </div>
    );
};

export default Layout;
