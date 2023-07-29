import { FC, ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';

interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className="h-screen md:grid md:grid-cols-4 md:gap-2">
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <title>Coeus</title>
            </Head>

            <Sidebar />
            <div className="hidden md:block md:col-span-1"></div>

            <div className="md:col-span-3 py-4 px-4">{children}</div>
        </div>
    );
};

export default Layout;
