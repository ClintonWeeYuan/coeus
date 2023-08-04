import { FC, useRef, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { IClass } from '@/models/class.model';

interface Props {
    data: IClass[];
}

const WeekColumn: FC<Props> = ({ data }) => {
    const constraintsRef = useRef(null);
    const eventRef = useRef(null);
    const [origin, setOrigin] = useState(0);
    const snapToEventBlock = (event: MouseEvent, info: PanInfo) => {
        const blockHeight = 64;
        const threshold = 0.7;

        const isPositive = info.offset.y > 0;

        let numberOfIncrements = Math.floor(
            Math.abs(info.offset.y / blockHeight),
        );
        const leftOver =
            Math.abs(info.offset.y % blockHeight) >= threshold * blockHeight
                ? 1
                : 0;
        numberOfIncrements += leftOver;

        const newOrigin = isPositive
            ? origin + numberOfIncrements * blockHeight
            : origin - numberOfIncrements * blockHeight;

        // setOrigin(origin + 4);
        setOrigin(newOrigin < 0 ? 0 : newOrigin);
    };

    return (
        <motion.div
            ref={constraintsRef}
            className="absolute top-12 left-0 h-full w-full"
        >
            {data.map((item, index) => (
                <motion.div
                    key={index}
                    ref={eventRef}
                    drag="y"
                    dragConstraints={constraintsRef}
                    dragMomentum={false}
                    initial={false}
                    dragTransition={{
                        bounceStiffness: 9000,
                        bounceDamping: 200,
                    }}
                    whileDrag={{
                        scale: 0.95,
                        backgroundColor: '#5FAEF1',
                        zIndex: 50,
                        boxShadow: '10px 10px 0 rgba(0, 0, 0, 0.2)',
                    }}
                    dragSnapToOrigin={true}
                    onDragEnd={snapToEventBlock}
                    style={{
                        top: (new Date(item.startTime).getHours() - 8) * 64,
                    }}
                    className={`absolute bg-primary-500 w-full h-32 hover:cursor-pointer`}
                >
                    {item.name}
                </motion.div>
            ))}
        </motion.div>
    );
};

export default WeekColumn;
