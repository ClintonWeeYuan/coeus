import { FC } from "react";

const AvailableHoursBar : FC = () => {

  const slots = [{start: 7, end: 12}, {start: 13, end: 15}];

  return(
    <div className="relative bg-gray-100 rounded-lg col-span-9 h-full grid grid-cols-24">
      {
        slots.map((slot, index) => (
        <div key={index} style={{gridColumn: `${slot.start} / ${slot.end}`}} className="overflow-hidden px-4 flex items-center h-full rounded-lg bg-primary-700 text-white">
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">7:00 - 11:00</p>
        </div>
      ))
      }

    </div>
  )
}

export default AvailableHoursBar