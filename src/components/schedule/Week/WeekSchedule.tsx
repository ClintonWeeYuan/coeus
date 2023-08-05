import { FC, useMemo } from 'react';
import { PiClockBold } from 'react-icons/pi';
import dayjs from 'dayjs';
import WeekColumn from '@/components/schedule/Week/WeekColumn';
import { IClass } from '@/models/class.model';

interface Props {
    currentDate: Date;
    data: IClass[] | undefined;
}

const WeekSchedule: FC<Props> = ({ currentDate, data }) => {
    const weekList = useMemo(() => {
        const copyOfDate = new Date(currentDate.getTime());
        const res: string[] = [];
        for (let i = 0; i < 7; i++) {
            res.push(dayjs(copyOfDate).format('ddd, MMM D'));
            copyOfDate.setDate(copyOfDate.getDate() + 1);
        }
        return res;
    }, [currentDate]);

    const CLASSDATA: IClass[][] = useMemo(() => {
        const classDataArray = [
            ...Array.from({ length: 7 }, (): IClass[] => []),
        ];

        data?.forEach((value) => {
            const currentDate = new Date(value.startTime);
            const dayInWeek = currentDate.getDay()
                ? currentDate.getDay() - 1
                : 6;
            classDataArray[dayInWeek].push(value);
        });

        return classDataArray;
    }, [data]);

    return (
        <div className="w-full overflow-x-auto overflow-y-hidden">
            <p>Week Schedule</p>

            <div className="grid grid-cols-[repeat(15,minmax(50px,1fr))]">
                <div className="col-span-1 border border-gray-300">
                    <div className="p-2">
                        <PiClockBold />
                    </div>
                    {[...Array.from(Array(12).keys())].map((item) => (
                        <div
                            key={item}
                            className="flex justify-end  px-2 py-2 h-32"
                        >
                            <p>{item + 8}:00</p>
                        </div>
                    ))}
                </div>
                {weekList.map((day, index) => (
                    <div
                        key={day}
                        className="relative col-span-2 border border-gray-300"
                    >
                        <div className="h-12 flex justify-center items-center">
                            {day}
                        </div>
                        {[...Array.from(Array(12).keys())].map(
                            (item, index) => (
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
                            ),
                        )}

                        <WeekColumn data={CLASSDATA[index]} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekSchedule;
