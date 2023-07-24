import { FC } from 'react';
import { AiFillSchedule } from 'react-icons/ai';

const Header: FC = () => {
    return (
        <div className="flex items-center py-4 px-4">
            <AiFillSchedule className="text-secondary-500 text-3xl" />
            <p className="text-xl ml-2">Schedule</p>

            <div className="flex items-center ml-8 text-gray-400 text-sm font-semibold">
                <p className="px-4 cursor-pointer hover:text-primary-500">
                    List
                </p>
                <p className="px-4 cursor-pointer hover:text-primary-500">
                    Weekly
                </p>
                <p className="px-4 cursor-pointer hover:text-primary-500">
                    Monthly
                </p>
            </div>
        </div>
    );
};

export default Header;
