import { FC } from 'react';
import { ClassEvent } from "@prisma/client";

interface Props {
    currentClass: ClassEvent;
}
const MonthEventBlock: FC<Props> = ({ currentClass }) => {
    return (
        <p className="w-full bg-primary-500 text-xs mb-1">
            {currentClass.title}
        </p>
    );
};

export default MonthEventBlock;
