import { FC } from 'react';
import CreateClassModal from '@/components/schedule/CreateClassModal';

const Header: FC = () => {
    return (
        <div className="flex items-center justify-between py-4 px-4">
            <div className="flex flex-col md:flex-row md:items-center">
                <p className="text-xl md:text-2xl font-bold mr-2 md:mr-8">
                    Week of July 31, 2023
                </p>
                <p className="text-md text-gray-400 font-semibold">0 classes</p>
            </div>
            <CreateClassModal />
        </div>
    );
};

export default Header;
