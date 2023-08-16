import {
    FC,
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { Coordinates, IClass } from '@/lib/types';
import ConfirmClassChangeModal from '@/components/schedule/Week/ConfirmClassChangeModal';
import { trpc } from '@/utils/trpc';
import { calculateNumberOfIncrements } from '@/utils/weekScheduleDrapAndDrop';

interface Props {
    containerRef: MutableRefObject<HTMLDivElement | null>;
    event: IClass;
    refetch: () => void;
}

//Height of one block, in pixels
const blockHeight = 64;

//Number of minutes in one block
const blockTime = 30;

const WeekEvent: FC<Props> = ({ containerRef, event, refetch }) => {
    const eventRef = useRef(null);
    const [blockWidth, setBlockWidth] = useState(
        containerRef.current ? containerRef.current.clientWidth / 7 : 120,
    );

    const onResize = useCallback(() => {
        if (containerRef.current) {
            setBlockWidth(containerRef.current.clientWidth / 7);
        }
    }, [containerRef]);

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const [coordinates, setCoordinates] = useState<Coordinates>({
        x:
            (event.startTime.getDay() ? event.startTime.getDay() - 1 : 6) *
            blockWidth,
        y:
            ((event.startTime.getHours() - 8) * 2 +
                event.startTime.getMinutes() / 30) *
            64,
    });
    const [newDate, setNewDate] = useState<Date>(new Date());
    const [newEndDate, setNewEndDate] = useState<Date>(new Date());

    const [changeInTimeIncrementsX, setChangeInTimeIncrementsX] = useState(0);
    const [changeInTimeIncrementsY, setChangeInTimeIncrementsY] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const { mutateAsync } = trpc.class.editClass.useMutation();

    const getDurationInBlocks = (startDate: Date, endDate: Date) => {
        const duration = endDate.getTime() - startDate.getTime();
        return duration / 1000 / 60 / 30;
    };

    const updateTime = async (isAccept: boolean) => {
        if (isAccept) {
            //Set event's start time to new date
            const newEvent: IClass = { ...event };
            newEvent.startTime = newDate;
            newEvent.endTime = newEndDate;

            await mutateAsync(newEvent);
            refetch();
        } else {
            //Revert back to original position
            const oldCoordinates: Coordinates = {
                x: coordinates.x - changeInTimeIncrementsX * blockWidth,
                y: coordinates.y - changeInTimeIncrementsY * blockHeight,
            };

            setCoordinates(oldCoordinates);
        }
    };

    const snapToEventBlock = async (e: MouseEvent, info: PanInfo) => {
        const numberOfIncrementsY = calculateNumberOfIncrements(
            info.offset.y,
            blockHeight,
        );

        const numberOfIncrementsX = calculateNumberOfIncrements(
            info.offset.x,
            blockWidth,
        );

        setChangeInTimeIncrementsX(numberOfIncrementsX);
        setChangeInTimeIncrementsY(numberOfIncrementsY);

        if (numberOfIncrementsX != 0 || numberOfIncrementsY != 0) {
            setModalOpen(true);

            //Set New Y Coordinates
            const newCoordinates = {
                x: coordinates.x + numberOfIncrementsX * blockWidth,
                y: coordinates.y + numberOfIncrementsY * blockHeight,
            };

            setCoordinates(newCoordinates);

            //Set new date, which will be used to update mongodb
            const updatedDate: Date = new Date(event.startTime);
            updatedDate.setDate(updatedDate.getDate() + numberOfIncrementsX);

            updatedDate.setMinutes(
                updatedDate.getMinutes() + numberOfIncrementsY * blockTime,
            );
            setNewDate(updatedDate);

            //Set new date, which will be used to update mongodb
            const updatedEndDate: Date = new Date(event.endTime);
            updatedEndDate.setDate(
                updatedEndDate.getDate() + numberOfIncrementsX,
            );

            updatedEndDate.setMinutes(
                updatedEndDate.getMinutes() + numberOfIncrementsY * blockTime,
            );

            setNewEndDate(updatedEndDate);
        }
    };

    return (
        <>
            <motion.div
                ref={eventRef}
                drag={true}
                dragConstraints={containerRef}
                dragMomentum={false}
                dragElastic={0}
                initial={false}
                dragTransition={{
                    bounceStiffness: 9000,
                    bounceDamping: 200,
                }}
                whileDrag={{
                    scale: 0.95,
                    opacity: 0.7,
                    zIndex: 50,
                    boxShadow: '10px 10px 0 rgba(0, 0, 0, 0.2)',
                    position: 'absolute',
                }}
                dragSnapToOrigin={true}
                onDragEnd={snapToEventBlock}
                style={{
                    top: `${coordinates.y}px`,
                    left: `${coordinates.x}px`,
                    width: `${blockWidth - 10}px`,
                    height: `${
                        blockHeight *
                        getDurationInBlocks(event.startTime, event.endTime)
                    }px`,
                }}
                className={`absolute overflow-hidden rounded-lg px-4 py-2 bg-primary-100 border-l-8 border-l-primary-700 absolute text-primary-700 z-20 hover:cursor-pointer px-2 py-2`}
            >
                <p>{event.name}</p>
                <p className="text-sm opacity-80">
                    {event.startTime.getHours()}am
                </p>
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
                        newDate={newDate}
                        updateTime={updateTime}
                        handleClose={() => setModalOpen(false)}
                        event={event}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default WeekEvent;
