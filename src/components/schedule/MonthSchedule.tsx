import { FC, useMemo } from 'react';
import MonthEventBlock from '@/components/schedule/MonthEventBlock';
import { ClassEvent } from "@prisma/client";

const DAYS = ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'];

interface Props {
    currentDate: Date;
    data: ClassEvent[] | undefined;
}

const MonthSchedule: FC<Props> = ({ currentDate, data }) => {
    const numberOfDaysInMonth = useMemo(() => {
        const months = currentDate.getMonth() + 1;
        const year: number = currentDate.getFullYear();
        return new Date(months, year, 0).getDate();
    }, [currentDate]);

    const numberOfDaysInPrevMonth = useMemo(() => {
        const months = currentDate.getMonth();
        const year: number = currentDate.getFullYear();
        return new Date(months, year, 0).getDate();
    }, [currentDate]);

    const ALLDATES = useMemo(() => {
        const firstDayDate = currentDate;
        firstDayDate.setDate(1);
        let firstDay = firstDayDate.getDay();
        if (firstDay == 0) firstDay = 7;

        return [...Array.from(Array(43).keys()).slice(1)].map(
            (value) => value - firstDay + 1,
        );
    }, [currentDate]);

    const CLASSDATA: ClassEvent[][] = useMemo(() => {
        const classDataArray = [
            ...Array.from(
                { length: numberOfDaysInMonth + 1 },
                (): ClassEvent[] => [],
            ),
        ];

        data?.forEach((value) => {
            const dateInMonth = value.startDate.getDate();
            classDataArray[dateInMonth].push(value);
        });

        return classDataArray;
    }, [data, numberOfDaysInMonth]);

    const isValidDate = (date: number): boolean => {
        return date > 0 && date <= numberOfDaysInMonth;
    };

    const formatDate = (date: number) => {
        if (date > numberOfDaysInMonth) return date - numberOfDaysInMonth;
        if (date <= 0) return numberOfDaysInPrevMonth - date * -1;
        return date;
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto">
                <thead>
                    <tr>
                        {DAYS.map((day) => (
                            <th className="py-4 border" key={day}>
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(6)].map((_, week) => (
                        <tr key={week}>
                            {[...Array(7)].map((_, day) => {
                                const currentDate = ALLDATES[week * 7 + day];
                                return (
                                    <td
                                        className={`border align-top ${
                                            !isValidDate(currentDate) &&
                                            'bg-gray-100'
                                        } relative`}
                                        key={day}
                                    >
                                        <div className="h-24 w-24 md:w-32 overflow-hidden">
                                            <p className="pl-1">
                                                {formatDate(currentDate)}
                                            </p>
                                            {CLASSDATA[currentDate] &&
                                                CLASSDATA[currentDate].map(
                                                    (item) => (
                                                        <MonthEventBlock
                                                            key={item.id}
                                                            currentClass={item}
                                                        />
                                                    ),
                                                )}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MonthSchedule;
