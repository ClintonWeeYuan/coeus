import { FC, useMemo, useRef } from 'react';
import { PiClockBold } from 'react-icons/pi';
import dayjs from 'dayjs';
import WeekEvent from '@/components/schedule/Week/WeekEvent';
import { ClassEvent } from "@prisma/client";

interface Props {
    currentDate: Date;
    data: ClassEvent[] | undefined;
    refetch: () => void;
}

const WeekSchedule: FC<Props> = ({ currentDate, data, refetch }) => {
    const weekList = useMemo(() => {
        const copyOfDate = new Date(currentDate.getTime());
        const res: string[] = [];
        for (let i = 0; i < 7; i++) {
            res.push(dayjs(copyOfDate).format('ddd, MMM D'));
            copyOfDate.setDate(copyOfDate.getDate() + 1);
        }
        return res;
    }, [currentDate]);

    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full overflow-x-auto overflow-y-hidden">
            <div className="grid grid-cols-15">
                <div className="flex col-span-1 justify-center items-center h-12">
                    <PiClockBold />
                </div>
                <div className="grid grid-cols-7 col-start-2 col-end-16">
                    {weekList.map((day) => (
                        <div
                            key={day}
                            className="col-span-1 flex justify-center items-center border border-gray-300"
                        >
                            {day}
                        </div>
                    ))}
                </div>
                <div className="col-span-1">
                    <div className="flex flex-col">
                        {[...Array.from(Array(12).keys())].map((item) => (
                            <div
                                key={item}
                                className="flex justify-end h-32 px-2"
                            >
                                <p>{item + 8}:00</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="grid grid-cols-7 relative  col-start-2 col-end-16"
                    ref={containerRef}
                >
                    {data?.map((event) => (
                        <WeekEvent
                            refetch={refetch}
                            key={event.id}
                            event={event}
                            containerRef={containerRef}
                        />
                    ))}
                    {weekList.map((day) => (
                        <div
                            key={day}
                            className="relative border border-gray-300"
                        >
                            {/* Boxes that will contain the schedule events */}
                            <div className="">
                                {[...Array.from(Array(12).keys())].map(
                                    (item, index) => (
                                        <div key={index}>
                                            <div
                                                style={{ height: '64px' }}
                                                className="border-t border-gray-300 w-full"
                                            ></div>
                                            <div
                                                style={{ height: '64px' }}
                                                className="border-t border-dashed border-gray-300 w-full"
                                            ></div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex"></div>
        </div>
    );
};

export default WeekSchedule;
