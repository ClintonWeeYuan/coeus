import { FC, useRef } from 'react';
import { motion } from 'framer-motion';
import { IClass } from '@/lib/types';
import WeekEvent from '@/components/schedule/Week/WeekEvent';

interface Props {
    data: IClass[];
}

const WeekColumn: FC<Props> = ({ data }) => {
    const columnRef = useRef(null);

    return (
        <motion.div
            ref={columnRef}
            className="absolute top-12 left-0 h-full w-full"
        >
            {data.map((event, index) => (
                <WeekEvent key={index} event={event} columnRef={columnRef} />
            ))}
        </motion.div>
    );
};

export default WeekColumn;
