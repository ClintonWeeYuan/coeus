import { FC } from 'react';
import Select from '@/components/common/Select';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const ViewOptions: FC = () => {
    const options = [
        { display: 'Day View', value: 'Day View' },
        { display: 'Week View', value: 'Week View' },
        { display: 'Month View', value: 'Month View' },
    ];

    return (
        <div className="w-full flex justify-around">
            <div className="flex items-center">
                <button type="button" className="btn btn-circle btn-ghost">
                    <BsChevronLeft />
                </button>
                <p className="text-lg px-4">Today</p>
                <button type="button" className="btn btn-circle btn-ghost">
                    <BsChevronRight />
                </button>
            </div>
            <div className="w-48">
                <Select options={options} />
            </div>
        </div>
    );
};

export default ViewOptions;
