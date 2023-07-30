import { FC } from 'react';

const DAYS = ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'];
const MonthSchedule: FC = () => {
    const today = new Date();
    const months = today.getMonth() + 1;
    const year: number = today.getFullYear();
    const numberOfDaysInMonth = new Date(months, year, 0).getDate();
    const numberOfDaysInPrevMonth = new Date(months - 1, year, 0).getDate();

    const firstDayDate = today;
    firstDayDate.setDate(1);
    const firstDay = firstDayDate.getDay();

    const isValidDate = (date: number): boolean => {
        return date > 0 && date <= numberOfDaysInMonth;
    };

    const ALLDATES: number[] = [...Array.from(Array(43).keys()).slice(1)].map(
        (value) => value - firstDay + 1,
    );

    const formatDate = (date: number) => {
        if (date > numberOfDaysInMonth) return date - numberOfDaysInMonth;
        if (date <= 0) return numberOfDaysInPrevMonth - date * -1;
        return date;
    };

    return (
        <div>
            <table className="table-auto">
                <thead>
                    <tr>
                        {DAYS.map((day) => (
                            <th className="w-32 py-4 border border-2" key={day}>
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(6)].map((_, week) => (
                        <tr key={_}>
                            {[...Array(7)].map((_, day) => {
                                const currentDate = ALLDATES[week * 7 + day];
                                return (
                                    <td
                                        className={`border border-2 ${
                                            !isValidDate(currentDate) &&
                                            'bg-gray-100'
                                        } h-24 relative`}
                                        key={day}
                                    >
                                        <p className="absolute top-2 left-2">
                                            {formatDate(currentDate)}
                                        </p>
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
