import { ReactElement, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import Header from '@/components/schedule/Header';
import ViewOptions from '@/components/schedule/ViewOptions';
import MonthSchedule from '@/components/schedule/MonthSchedule';
import WeekSchedule from '@/components/schedule/WeekSchedule';
import DaySchedule from '@/components/schedule/DaySchedule';

const Schedule: NextPageWithLayout = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [currentView, setCurrentView] = useState<string>('month');

    const handleDateChange = (sign: number, type: string) => {
        if (type == 'month') {
            const newDate = new Date(currentDate.getTime());
            newDate.setMonth(currentDate.getMonth() + sign);
            setCurrentDate(newDate);
        }
    };

    const handleViewChange = (view: string) => {
        setCurrentView(view);
    };

    return (
        <>
            <Header currentView={currentView} currentDate={currentDate} />
            <div className="divider"></div>
            <ViewOptions
                changeCurrentView={handleViewChange}
                changeDate={handleDateChange}
            />
            <div className=" flex justify-center">
                {currentView == 'month' ? (
                    <MonthSchedule currentDate={currentDate} />
                ) : currentView == 'week' ? (
                    <WeekSchedule />
                ) : (
                    <DaySchedule />
                )}
            </div>
        </>
    );
};

Schedule.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Schedule;
