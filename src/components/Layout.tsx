import { FC, ReactNode, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';
import { CgMenu } from 'react-icons/cg';

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

            <div className="md:col-span-3 py-4 px-4">{children}</div>
        </div>
    );
};

export default Layout;
