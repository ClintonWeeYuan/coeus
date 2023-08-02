import { FC, useMemo } from 'react';
import { PiClockBold } from 'react-icons/pi';
import dayjs from 'dayjs';
import WeekColumn from '@/components/schedule/Week/WeekColumn';
interface Props {
    currentDate: Date;
}

const WeekSchedule: FC<Props> = ({ currentDate }) => {
    const weekList = useMemo(() => {
        const copyOfDate = new Date(currentDate.getTime());
        const res: string[] = [];
        for (let i = 0; i < 7; i++) {
            res.push(dayjs(copyOfDate).format('ddd, MMM D'));
            copyOfDate.setDate(copyOfDate.getDate() + 1);
        }
        return res;
    }, [currentDate]);

    return (
        <div className="w-full">
            <p>Week Schedule</p>

            <div className="grid grid-cols-[repeat(15,minmax(50px,300px))] w-full overflow-auto">
                <div className="col-span-1 border border-gray-300">
                    <div className="p-2">
                        <PiClockBold />
                    </div>
                    {[...Array.from(Array(10).keys())].map((item) => (
                        <div
                            key={item}
                            className="flex justify-end  px-2 py-2 h-32"
                        >
                            <p>{item}:00</p>
                        </div>
                    ))}
                </div>
                {weekList.map((day) => (
                    <div
                        key={day}
                        className="relative col-span-2 border border-gray-300"
                    >
                        <div className="h-12 flex justify-center items-center">
                            {day}
                        </div>
                        {[...Array.from(Array(6).keys())].map((item, index) => (
                            <div key={index}>
                                <div
                                    style={{ height: '64px' }}
                                    className="border-t border-gray-300"
                                ></div>
                                <div
                                    style={{ height: '64px' }}
                                    className="border-t border-dashed border-gray-300"
                                ></div>
                            </div>
                        ))}

                        <WeekColumn />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekSchedule;
