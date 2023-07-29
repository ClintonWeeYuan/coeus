import { ReactElement } from 'react';
import Layout from '@/components/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import Header from '@/components/schedule/Header';
import CreateClassModal from '@/components/schedule/CreateClassModal';

const Schedule: NextPageWithLayout = () => {
    return (
        <div className="">
            <Header />
            <CreateClassModal />
        </div>
    );
};

Schedule.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Schedule;
