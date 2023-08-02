import DatePicker from 'react-datepicker';
import { FC, forwardRef } from 'react';
import dayjs from 'dayjs';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Controller, useFormContext } from 'react-hook-form';
import { FormValues } from '@/components/schedule/CreateClassModal';
import { TIMES } from '@/lib/dateTime';

interface Props {
    name: 'startTime';
}

const CustomDatePicker: FC<Props> = ({ name }) => {
    const { control } = useFormContext<FormValues>();

    const isDateInFuture = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    };

    const setTimeInString = (
        date: Date,
        hours: number,
        minutes: number,
    ): string => {
        date.setHours(hours, minutes, 0, 0);
        return date.toDateString();
    };

    return (
        <div className="relative mt-1">
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <div className="flex w-full grid grid-cols-2 gap-4">
                        <DatePicker
                            filterDate={(date) => isDateInFuture(date)}
                            selected={value as Date}
                            onChange={onChange}
                            nextMonthButtonLabel=">"
                            previousMonthButtonLabel="<"
                            popperClassName="react-datepicker-left"
                            customInput={<ButtonInput />}
                            renderCustomHeader={({
                                date,
                                decreaseMonth,
                                increaseMonth,
                                prevMonthButtonDisabled,
                                nextMonthButtonDisabled,
                            }) => (
                                <div className="flex items-center justify-between px-2 py-2">
                                    <span className="text-lg text-gray-700">
                                        {dayjs(date).format('DD/MM/YYYY')}
                                    </span>

                                    <div className="space-x-2">
                                        <button
                                            onClick={decreaseMonth}
                                            disabled={prevMonthButtonDisabled}
                                            type="button"
                                            className={` ${
                                                prevMonthButtonDisabled &&
                                                'cursor-not-allowed opacity-50'
                                            } inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500`}
                                        >
                                            <AiOutlineLeft className="w-5 h-5 text-gray-600" />
                                        </button>

                                        <button
                                            onClick={increaseMonth}
                                            disabled={nextMonthButtonDisabled}
                                            type="button"
                                            className={`${
                                                nextMonthButtonDisabled &&
                                                'cursor-not-allowed opacity-50'
                                            } inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500`}
                                        >
                                            <AiOutlineRight className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        />
                        <select
                            className="custom-select"
                            onChange={(event) => {
                                onChange(new Date(event.target.value));
                            }}
                            defaultValue={new Date().toDateString()}
                        >
                            {TIMES.map((time, index) =>
                                index == 0 ? (
                                    <option
                                        key={index}
                                        value={setTimeInString(
                                            value,
                                            time.hours,
                                            time.minutes,
                                        )}
                                    >
                                        {time.display}
                                    </option>
                                ) : (
                                    <option
                                        key={index}
                                        value={setTimeInString(
                                            value,
                                            time.hours,
                                            time.minutes,
                                        )}
                                    >
                                        {time.display}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>
                )}
            />
        </div>
    );
};

export default CustomDatePicker;

interface ButtonProps {
    value?: Date;
    onClick?: () => void;
}

const ButtonInput: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ value, onClick }, ref) => (
        <button
            onClick={onClick}
            ref={ref}
            type="button"
            className="custom-select"
        >
            {dayjs(value).format('DD/MM/YYYY')}
        </button>
    ),
);
ButtonInput.displayName = 'DatePickerButton';
