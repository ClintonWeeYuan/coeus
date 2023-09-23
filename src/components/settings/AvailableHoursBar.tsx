import { FC, useEffect, useState } from "react";

interface Slot {
  start: number,
  end: number
}

interface Props {
  slots: Slot[]
}

const AvailableHoursBar: FC<Props> = ({ slots }) => {

  const [mergedSlots, setMergedSlots] = useState(slots);

  useEffect(() => {

    slots.sort((a,b) => {
      if(a.start < b.start){
        return -1;
      } else if(a.start == b.start){
        return a.end - b.end;
      } else {
        return 1;
      }
    });
    console.log(slots)

    const temp: Slot[] = [];

    slots.forEach((slot) => {
      if (temp.length == 0) {
        temp.push({ ...slot });
        return;
      }

      const prevSlot = temp[temp.length - 1];

      if (slot.start <= prevSlot.end) {
        prevSlot.end = Math.max(slot.end, prevSlot.end);
      } else {
        temp.push({...slot});
      }

    })

    setMergedSlots(temp);
  }, [slots])

  return (
    <div className="relative bg-gray-100 rounded-lg col-span-9 h-full grid grid-cols-48">
      {
        mergedSlots.map((slot, index) => (
          <div key={index} style={{ gridColumn: `${slot.start} / ${slot.end}` }}
               className="overflow-hidden px-4 flex items-center h-full rounded-lg bg-primary-700 text-white">
            <p className="text-center text-ellipsis overflow-hidden whitespace-nowrap"></p>
          </div>
        ))
      }

    </div>
  )
}

export default AvailableHoursBar