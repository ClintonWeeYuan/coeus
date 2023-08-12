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
        const startHour = event.startTime.getHours();
        const endHour = event.endTime.getHours();

        return (endHour - startHour) * 32;
    }, [event]);
    return (
        <div
            style={{ top: `${top}px`, height: `${height}px` }}
            className="rounded-lg px-4 py-2 bg-primary-500 absolute w-full"
        >
            <p>{event.name}</p>
            <p className="text-sm opacity-80">
                {event.startTime.getHours()}:00
            </p>
        </div>
    );
};

export default DayEvent;
