import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { trpc } from '@/utils/trpc';
import PrivateRoute from '@/components/PrivateRoute';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const privateRoutes = ['/dashboard', '/homework', '/schedule'];
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);

    return getLayout(
        <PrivateRoute privateRoutes={privateRoutes}>
            <Component {...pageProps} />
        </PrivateRoute>,
    );
};

export default trpc.withTRPC(MyApp);
