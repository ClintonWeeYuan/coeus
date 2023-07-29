import { FC, ReactNode } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Head from 'next/head';
import MobileSidebar from '@/components/Layout/MobileSidebar';

interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className="h-screen md:grid md:grid-cols-5 md:gap-0">
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
