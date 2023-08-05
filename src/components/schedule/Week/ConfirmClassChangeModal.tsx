import { FC, useMemo } from 'react';
import { IClass } from '@/lib/types';
import Backdrop from '@/components/common/Backdrop';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { simpleDateTimeFormat } from '@/lib/dateFormats';

interface Props {
    event: IClass;
    handleClose: () => void;
    updateTime: (isAccept: boolean) => void;
    changeInTimeIncrements: number;
}
const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0,
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: '100vh',
        opacity: 0,
    },
};

const ConfirmClassChangeModal: FC<Props> = ({
    handleClose,
    event,
    updateTime,
    changeInTimeIncrements,
}) => {
    const handleChangeInTime = (isAccept: boolean) => {
        updateTime(isAccept);
        handleClose();
    };

    const newTime = useMemo((): Date => {
        const newDate = new Date(event.startTime);
        newDate.setHours(newDate.getHours() + changeInTimeIncrements / 2);
        newDate.setMinutes(
            newDate.getMinutes() + (changeInTimeIncrements % 2) * 30,
        );
        return newDate;
    }, [changeInTimeIncrements, event.startTime]);
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-lg px-10 py-6 w-full md:w-2/5"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <p className="text-3xl mb-4">Change of Class Time</p>
                <p className="py-4 mb-2 md:mb-8">
                    Are you sure you want to change the time for {event.name},
                    from{' '}
                    <span className="font-bold">
                        {dayjs(event.startTime).format(simpleDateTimeFormat)}
                    </span>{' '}
                    to{' '}
                    <span className="font-bold">
                        {dayjs(newTime).format(simpleDateTimeFormat)}
                    </span>
                </p>
                <div className="flex flex-col md:flex-row">
                    <button
                        className="btn btn-primary md:mr-4"
                        onClick={() => handleChangeInTime(true)}
                    >
                        Confirm
                    </button>
                    <button
                        className="btn btn-ghost"
                        onClick={() => handleChangeInTime(false)}
                    >
                        No, I changed my mind
                    </button>
                </div>
            </motion.div>
        </Backdrop>
    );
};

export default ConfirmClassChangeModal;
