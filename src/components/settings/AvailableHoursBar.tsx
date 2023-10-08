import { FC, useMemo } from "react";
import { Slot } from "@/lib/types";

interface Props {
  slots: Slot[]
}

const convertSlotNumberToTime = (startSlot: number, endSlot: number): string => {
  const startHour = Math.floor(startSlot / 2).toString();
  const startMinute = startSlot % 2 ? "30" : "00";

  const endHour = Math.floor(endSlot / 2).toString();
  const endMinute = endSlot % 2 ? "30" : "00";

  return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
}

const AvailableHoursBar: FC<Props> = ({ slots }) => {

  const mergedSlots = useMemo(() => {
    slots.sort((a, b) => {
      if (a.start < b.start) {
        return -1;
      } else if (a.start == b.start) {
        return a.end - b.end;
      } else {
        return 1;
      }
    });

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
        temp.push({ ...slot });
      }
    })

    return slots;
  }, [slots])

  return (
    <div className="relative col-span-8 md:col-span-10 h-full flex flex-col max-w-full overflow-x-auto border-2 border-red-500">
      <div className="w-full bg-gray-100 rounded-lg grid grid-cols-48 h-full min-w-500">
        {
          mergedSlots.map((slot, index) => (
            <div key={index} style={{ gridColumn: `${slot.start} / ${slot.end}` }} className="tooltip" data-tip={convertSlotNumberToTime(slot.start, slot.end)}>
              <div
                className="px-4 flex items-center h-full rounded-lg bg-primary-700 text-white"/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AvailableHoursBar