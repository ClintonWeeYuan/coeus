import { ReactElement, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import Header from '@/components/schedule/Header';
import ViewOptions from '@/components/schedule/ViewOptions';
import MonthSchedule from '@/components/schedule/MonthSchedule';
import WeekSchedule from '@/components/schedule/Week/WeekSchedule';
import DaySchedule from '@/components/schedule/Day/DaySchedule';
import { trpc } from '@/utils/trpc';
import useUser from '@/components/hooks/useUser';

const Schedule: NextPageWithLayout = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [currentView, setCurrentView] = useState<string>('day');
    const { user } = useUser();

    const { data, refetch } = trpc.class.getClasses.useQuery({
        date: currentDate,
        ownerId: user?.id || -1,
        type: currentView,
    });

    const handleDateChange = (sign: number) => {
        if (currentView == 'month') {
            const newDate: Date = new Date(currentDate.getTime());
            newDate.setMonth(currentDate.getMonth() + sign);
            setCurrentDate(newDate);
        } else if (currentView == 'day') {
            const newDate: Date = new Date(currentDate.getTime());
            newDate.setDate(currentDate.getDate() + sign);
            setCurrentDate(newDate);
        } else if (currentView == 'week') {
            const newDate: Date = new Date(currentDate.getTime());
            newDate.setDate(currentDate.getDate() + 7 * sign);
            setCurrentDate(newDate);
        }
    };

    const handleViewChange = (view: string) => {
        const newDate: Date = new Date(currentDate.getTime());
        if (view == 'week') {
            const day = newDate.getDay();
            newDate.setDate(newDate.getDate() - day + (day === 0 ? -6 : 1));
        } else if (view == 'month') {
            newDate.setDate(1);
        }

        setCurrentDate(newDate);
        setCurrentView(view);
    };

    return (
        <>
            <Header
                classCount={data?.length || 0}
                currentView={currentView}
                currentDate={currentDate}
            />
            <div className="divider"></div>
            <ViewOptions
                changeCurrentView={handleViewChange}
                changeDate={handleDateChange}
            />
            <div className=" flex justify-center">
                {currentView == 'month' ? (
                    <MonthSchedule data={data} currentDate={currentDate} />
                ) : currentView == 'week' ? (
                    <WeekSchedule
                        data={data}
                        currentDate={currentDate}
                        refetch={refetch}
                    />
                ) : (
                    <DaySchedule data={data} />
                )}
            </div>
        </>
    );
};

Schedule.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Schedule;
