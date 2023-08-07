import { FC, MutableRefObject } from 'react';
import { motion } from 'framer-motion';
import { IClass } from '@/lib/types';
import WeekEvent from '@/components/schedule/Week/WeekEvent';

interface Props {
    data: IClass[];
    containerRef: MutableRefObject<null>;
}

const WeekColumn: FC<Props> = ({ data, containerRef }) => {
    return (
        <motion.div className="absolute top-12 left-0 h-full w-full z-50">
            {data.map((event, index) => (
                <WeekEvent
                    key={index}
                    event={event}
                    containerRef={containerRef}
                />
            ))}
        </motion.div>
    );
};

export default WeekColumn;
