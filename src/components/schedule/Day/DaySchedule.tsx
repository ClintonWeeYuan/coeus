import { FC } from 'react';
import { IClass } from '@/lib/types';
import { Card } from '@tremor/react';
import DayEvent from '@/components/schedule/Day/DayEvent';

interface Props {
    data: IClass[] | undefined;
}
const DaySchedule: FC<Props> = ({ data }) => {
    return (
        <div className="w-full flex justify-center overflow-auto">
            <Card className="w-full md:w-3/4">
                <div className="flex md:px-4 overflow-auto max-h-[500px] md:scrollbar">
                    <div className="flex flex-col">
                        {[...Array.from(Array(12).keys())].map((item) => (
                            <div
                                key={item}
                                className="flex items-center h-16 px-2 shrink-0"
                            >
                                <p className="mr-4">{item + 8}:00</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col relative w-full ">
                        {[...Array.from(Array(12).keys())].map((item) => (
                            <div
                                key={item}
                                className="flex items-center h-16 px-2 shrink-0"
                            >
                                <div className="border-t-2 border-t-gray-300 w-full"></div>
                            </div>
                        ))}
                        {data?.map((classEvent) => (
                            <DayEvent key={classEvent.id} event={classEvent} />
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DaySchedule;
