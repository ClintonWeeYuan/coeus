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
        <div className={`h-screen ${inter.variable} ${roboto.className} `}>
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <title>Coeus</title>
            </Head>
            <div className="flex overflow-auto">
                <div className="hidden md:block md:w-1/4 h-screen"></div>

                <div className="block md:hidden">
                    <MobileSidebar />
                </div>

                <div className="hidden md:block z-50 md:fixed w-1/4">
                    <Sidebar />
                </div>

                <div className="py-4 px-4 flex-1 h-screen overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
