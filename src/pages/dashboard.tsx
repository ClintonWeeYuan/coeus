import { ReactElement } from 'react';
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/pages/_app';

const Dashboard: NextPageWithLayout = () => {
    return (
        <div className="">
            <p>Dashboard</p>
        </div>
    );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Dashboard;
