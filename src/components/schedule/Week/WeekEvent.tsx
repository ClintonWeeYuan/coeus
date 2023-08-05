import { FC, MutableRefObject, useRef, useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { IClass } from '@/lib/types';
import ConfirmClassChangeModal from '@/components/schedule/Week/ConfirmClassChangeModal';
import { trpc } from '@/utils/trpc';

interface Props {
    columnRef: MutableRefObject<null>;
    event: IClass;
}
const WeekEvent: FC<Props> = ({ columnRef, event }) => {
    const eventRef = useRef(null);
    const [origin, setOrigin] = useState(
        ((event.startTime.getHours() - 8) * 2 +
            event.startTime.getMinutes() / 30) *
            64,
    );
    const [modalOpen, setModalOpen] = useState(false);
    const { mutateAsync } = trpc.class.editClass.useMutation();
    const snapToEventBlock = async (e: MouseEvent, info: PanInfo) => {
        setModalOpen(true);
        const blockHeight = 64;
        const blockTime = 30;
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

        numberOfIncrements = isPositive
            ? numberOfIncrements
            : numberOfIncrements * -1;

        if (numberOfIncrements != 0) {
            //Change time in MongoDB
            const newEvent: IClass = { ...event };
            newEvent.startTime.setHours(
                newEvent.startTime.getHours() + numberOfIncrements / 2,
            );
            newEvent.startTime.setMinutes(
                newEvent.startTime.getMinutes() +
                    (numberOfIncrements % 2) * blockTime,
            );

            console.log(newEvent.startTime);
            await mutateAsync(newEvent);

            const newOrigin = origin + numberOfIncrements * blockHeight;
            setOrigin(newOrigin < 0 ? 0 : newOrigin);
        }
    };

    return (
        <>
            <motion.div
                ref={eventRef}
                drag="y"
                dragConstraints={columnRef}
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
                    top: origin,
                }}
                className={`absolute bg-primary-500 w-full h-32 hover:cursor-pointer`}
            >
                {event.name +
                    '-' +
                    event.startTime.getHours() +
                    ':' +
                    event.startTime.getMinutes()}
            </motion.div>
            <AnimatePresence
                // Disable any initial animations on children that
                // are present when the component is first rendered
                initial={false}
                // Only render one component at a time.
                // The exiting component will finish its exit
                // animation before entering component is rendered
                mode="wait"
                // Fires when all exiting nodes have completed animating out
                onExitComplete={() => null}
            >
                {modalOpen && (
                    <ConfirmClassChangeModal
                        handleClose={() => setModalOpen(false)}
                        event={event}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default WeekEvent;
