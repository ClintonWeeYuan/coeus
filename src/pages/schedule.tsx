import { ReactElement } from 'react';
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import Header from '@/components/schedule/Header';
import ViewOptions from '@/components/schedule/ViewOptions';

const Schedule: NextPageWithLayout = () => {
    return (
        <>
            <Header />
            <div className="divider"></div>
            <ViewOptions />
        </>
    );
};

Schedule.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Schedule;
