import { FC, useEffect, useState } from 'react';
import CreateClassModal from '@/components/schedule/CreateClassModal';
import dayjs from 'dayjs';

interface Props {
    currentDate: Date;
    currentView: string;
    classCount: number;
}

const dateFormats: { [key: string]: string } = {
    day: 'ddd, D MMM YYYY',
    week: 'Week of D MMM YYYY',
    month: 'MMMM YYYY',
};

const Header: FC<Props> = ({ currentDate, currentView, classCount }) => {
    const [display, setDisplay] = useState(
        dayjs(currentDate).format('MMMM YYYY'),
    );

    useEffect(() => {
        setDisplay(dayjs(currentDate).format(dateFormats[currentView]));
    }, [currentDate, currentView]);
    return (
        <div className="flex items-center justify-between py-4 px-4">
            <div className="flex flex-col md:flex-row md:items-center">
                <p className="text-xl md:text-2xl font-bold mr-2 md:mr-8">
                    {display}
                </p>
                <p className="text-md text-gray-400 font-semibold">
                    {classCount} classes
                </p>
            </div>
            <CreateClassModal />
        </div>
    );
};

export default Header;
