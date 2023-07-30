import { FC } from 'react';
import { IClass } from '@/models/class.model';

interface Props {
    currentClass: IClass;
}
const MonthEventBlock: FC<Props> = ({ currentClass }) => {
    return (
        <>
            <p className="text-xs bg-primary-500 mb-1">{currentClass.name}</p>
        </>
    );
};

export default MonthEventBlock;
