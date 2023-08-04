import DatePicker from 'react-datepicker';
import { FC, forwardRef } from 'react';
import dayjs from 'dayjs';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Controller, useFormContext } from 'react-hook-form';
import { FormValues } from '@/components/schedule/CreateClassModal';
import { TIMELIST } from '@/lib/dateTime';

interface Props {
    name: 'startTime';
}

const CustomDatePicker: FC<Props> = ({ name }) => {
    const { control, setValue, getValues } = useFormContext<FormValues>();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        const time = e.target.value.split(':');
        const hours = parseInt(time[0]);
        const minutes = parseInt(time[1]);

        const currentTime = getValues().startTime;
        const newTime = new Date(currentTime.getTime());
        newTime.setHours(hours, minutes, 0, 0);
        setValue('startTime', newTime);
    };
    const isDateInFuture = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
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
                            onChange={(e) => handleChange(e)}
                            defaultValue={'1230'}
                        >
                            {TIMELIST.map((time, index) =>
                                index == 0 ? (
                                    <option key={index} value={time}>
                                        {time}
                                    </option>
                                ) : (
                                    <option key={index} value={time}>
                                        {time}
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
