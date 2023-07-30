import { FC } from 'react';
import { IClass } from '@/models/class.model';

interface Props {
    currentClass: IClass;
}
const MonthEventBlock: FC<Props> = ({ currentClass }) => {
    return (
        <p className="w-full bg-primary-500 text-xs mb-1">
            {currentClass.name}
        </p>
    );
};

export default MonthEventBlock;
