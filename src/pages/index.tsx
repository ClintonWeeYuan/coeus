import { ReactElement } from 'react';
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/pages/_app';

const Home: NextPageWithLayout = () => {
    return (
        <div className="">
            <p>Hello There</p>
        </div>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Home;
