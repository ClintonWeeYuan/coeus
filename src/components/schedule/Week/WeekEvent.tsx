import {
    FC,
    MutableRefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { Coordinates, IClass } from '@/lib/types';
import ConfirmClassChangeModal from '@/components/schedule/Week/ConfirmClassChangeModal';
import { trpc } from '@/utils/trpc';
import { calculateNumberOfIncrements } from '@/utils/weekScheduleDrapAndDrop';
import dayjs from 'dayjs';
import { simpleDateTimeFormat } from '@/lib/dateFormats';

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
    const [blockWidth, setBlockWidth] = useState(0);

    const onResize = useCallback(() => {
        if (containerRef.current) {
            console.log(containerRef.current?.clientWidth);
            setBlockWidth(containerRef.current.clientWidth / 7);
        }
    }, []);

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

    const [changeInTimeIncrementsX, setChangeInTimeIncrementsX] = useState(0);
    const [changeInTimeIncrementsY, setChangeInTimeIncrementsY] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const { mutateAsync } = trpc.class.editClass.useMutation();

    const updateTime = async (isAccept: boolean) => {
        if (isAccept) {
            //Set event's start time to new date
            const newEvent: IClass = { ...event };
            console.log(dayjs(newDate).format(simpleDateTimeFormat));
            newEvent.startTime = newDate;

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
                    backgroundColor: '#5FAEF1',
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
                }}
                className={`absolute rounded-xl bg-primary-300 text-secondary-500 w-40 z-20 h-32 hover:cursor-pointer px-2 py-2`}
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
