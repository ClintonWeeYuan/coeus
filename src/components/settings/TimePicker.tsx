import { FC } from "react";

interface Props {
  handleChange: (e: number) => void,
  className?: string,
  value: number
}

const TimePicker: FC<Props> = ({ handleChange, className, value }) => {

  const convertNumberToTime = (value: number) => {
    const numHours = Math.floor(value / 2);
    const numMinutes = (value % 2) * 30;

    const formattedHour = numHours < 10 ? `0${numHours.toString()}` : numHours.toString();
    const formattedMinutes = numMinutes == 30 ? "30" : "00";

    return formattedHour + ":" + formattedMinutes;
  }

  const TIMEARRAY = Array.from({ length: 48 }, (_, index) => ({ value: index, display: convertNumberToTime(index) }));


  return (
    <select
      className={`custom-select ${className}`}
      onChange={(e) => handleChange(parseInt(e.currentTarget.value))}
      value={value}
    >
      {TIMEARRAY.map((time, index) =>
        index == 0 ? (
          <option key={index} value={time.value}>
            {time.display}
          </option>
        ) : (
          <option key={index} value={time.value}>
            {time.display}
          </option>
        ),
      )}
    </select>
  )
}

export default TimePicker;