import { FC, ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';

interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className="h-screen grid grid-cols-4 gap-2">
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <title>Coeus</title>
            </Head>
            <div className="col-span-1">
                <Sidebar />
            </div>
            <div className="col-span-3">{children}</div>
        </div>
    );
};

export default Layout;
