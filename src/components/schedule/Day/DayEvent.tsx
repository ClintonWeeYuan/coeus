import { FC, useMemo } from 'react';
import { ClassEvent } from "@prisma/client";

interface Props {
    event: ClassEvent;
}
const DayEvent: FC<Props> = ({ event }) => {
    const top = useMemo(() => {
        const startHour = event.startDate.getHours();
        return (startHour - 8) * 64 + 32;
    }, [event]);

    const height = useMemo(() => {
        console.log(event.startDate);
        console.log(event.endDate)
        const duration = event.endDate.getTime() - event.startDate.getTime();
        return duration / 1000 /60 / 30 * 32;
    }, [event]);
    return (
        <div
            style={{ top: `${top}px`, height: `${height}px` }}
            className="rounded-lg px-4 py-2 bg-primary-100 border-l-8 border-l-primary-700 absolute text-primary-700 w-full overflow-hidden"
        >
            <p>{event.title}</p>
            <p className="text-sm">
                {event.startDate.getHours()}:00
            </p>
        </div>
    );
};

export default DayEvent;
