import { FC, useMemo } from 'react';
import { IClass } from '@/lib/types';

interface Props {
    event: IClass;
}
const DayEvent: FC<Props> = ({ event }) => {
    const top = useMemo(() => {
        const startHour = event.startTime.getHours();
        return (startHour - 8) * 64 + 32;
    }, [event]);

    const height = useMemo(() => {
        console.log(event.startTime);
        console.log(event.endTime)
        const duration = event.endTime.getTime() - event.startTime.getTime();
        return duration / 1000 /60 / 30 * 32;
    }, [event]);
    return (
        <div
            style={{ top: `${top}px`, height: `${height}px` }}
            className="rounded-lg px-4 py-2 bg-primary-100 border-l-8 border-l-primary-700 absolute text-primary-700 w-full overflow-hidden"
        >
            <p>{event.name}</p>
            <p className="text-sm">
                {event.startTime.getHours()}:00
            </p>
        </div>
    );
};

export default DayEvent;
