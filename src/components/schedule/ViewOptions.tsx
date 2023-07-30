import { FC } from 'react';
import Select from '@/components/common/Select';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

interface Props {
    changeDate: (sign: number, type: string) => void;
    changeCurrentView: (view: string) => void;
}

const ViewOptions: FC<Props> = ({ changeDate, changeCurrentView }) => {
    const options = [
        { display: 'Day View', value: 'day' },
        { display: 'Week View', value: 'week' },
        { display: 'Month View', value: 'month' },
    ];

    return (
        <div className="w-full flex justify-around mb-4">
            <div className="flex items-center">
                <button
                    onClick={() => changeDate(-1, 'month')}
                    type="button"
                    className="btn btn-circle btn-ghost active:bg-gray-400"
                >
                    <BsChevronLeft />
                </button>
                <p className="text-lg px-2 md:px-4">Today</p>
                <button
                    onClick={() => changeDate(1, 'month')}
                    type="button"
                    className="btn btn-circle btn-ghost active:bg-gray-400"
                >
                    <BsChevronRight />
                </button>
            </div>
            <div className="w-48">
                <Select onChange={changeCurrentView} options={options} />
            </div>
        </div>
    );
};

export default ViewOptions;
