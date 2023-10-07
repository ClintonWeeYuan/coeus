import { ReactElement, useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import AvailableHoursBar from "@/components/settings/AvailableHoursBar";
import CreateSlotModal from "@/components/settings/CreateSlotModal";
import { trpc } from "@/utils/trpc";
import useUser from "@/components/hooks/useUser";
import TimezoneSelect from "@/components/common/TimezoneSelect";
import { Slot } from "@/lib/types";
import { toast } from "sonner";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


const defaultSlot: Slot = { start: 18, end: 22 };

const Settings: NextPageWithLayout = () => {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false);

  const { data } = trpc.user.getUserSchedule.useQuery(user?.id || -1, {})

  console.log(data)

  const { mutateAsync } = trpc.user.editUser.useMutation({
    onSuccess: () => {
      toast.success("Schedule Updated!")
    },
    onError: () => {
      toast.error("Something went wrong...")
    },
    onSettled: () => {
      setIsLoading(false)
    }
  })

  const [checkedState, setCheckedState] = useState(
    [...new Array(7)].map(() => false)
  );

  const [slots, setSlots] = useState(checkedState.map((state) => state ? [{ start: 7, end: 12 }] : []))
  const [timezone, setTimezone] = useState<string>(data?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone);

  useEffect(() => {
    const userSchedule = data ? JSON.parse(data.schedule as string) : [];

    const initialCheckedState = [...checkedState];

    for (let i = 0; i < userSchedule.length; i++) {
      initialCheckedState[i] = userSchedule[i].length > 0;
    }

    setCheckedState(initialCheckedState)
    setSlots(userSchedule);
    setTimezone(data?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone);

  }, [data])

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    const updatedSlots = slots.map((slot, index) => {
        if (position === index && slot.length === 0) {
          return [defaultSlot];
        } else {
          return slot;
        }
      }
    )


    setSlots(updatedSlots)
    setCheckedState(updatedCheckedState);
  };

  const updateSlots = (updatedSlots: any[], index: number) => {
    const newSlots = [...slots];
    newSlots[index] = [...updatedSlots];
    setSlots(newSlots);
  }

  const saveSchedule = async () => {
    setIsLoading(true);
    const jsonSlots = JSON.stringify(slots);
    await mutateAsync({ id: user?.id || 0, schedule: jsonSlots, timezone: timezone })
  }

  return (
    <div className="">

      <div className="py-6 px-2 md:px-8">
        <p className="header">Settings</p>
      </div>

      <div className="px-2 md:px-8">
        <div className="py-6">
          <p className="mb-2">Which timezone are you in?</p>
          <TimezoneSelect defaultTimezone={timezone} onChange={(newTimezone: string) => setTimezone(newTimezone)}/>
        </div>

        <div className="py-6">
          <p className="mb-2">Which days are you available?</p>
          <div className="flex flex-col md:flex-row">
            {
              weekdays.map((weekday, index) => (
                <div key={weekday} className="px-2 py-4">
                  <input type="checkbox" id={weekday} className="peer hidden" checked={checkedState[index]}
                         onChange={() => handleOnChange(index)}/>
                  <label htmlFor={weekday} className="block w-full md:w-32 text-center select-none cursor-pointer rounded-lg border-2 border-primary-200
                    py-3 px-6 font-bold text-primary-200 transition-colors duration-200 ease-in-out peer-checked:bg-primary-200 peer-checked:text-primary-700 peer-checked:border-primary-200 ">{weekday}</label>
                </div>
              ))
            }
          </div>
        </div>

        <div className="py-6 mb-8">
          <p className="mb-2">Which times are you available?</p>
          <div className="flex flex-col overflow-x-auto">
            {
              slots.map((slot, index) => checkedState[index] && (
                <div key={index} className="px-2 mb-6 grid grid-cols-12 gap-2 md:gap-4 items-center">
                  <div className="col-span-2 md:col-span-1 flex justify-center select-none cursor-pointer rounded-lg border-2 border-primary-200
                    py-3 px-6 font-bold text-primary-200 transition-colors duration-200 ease-in-out peer-checked:bg-primary-200 peer-checked:text-primary-700 peer-checked:border-primary-200">{weekdays[index].slice(0, 3)}</div>
                  <AvailableHoursBar slots={slot}/>
                  <CreateSlotModal updateSlots={(slots) => updateSlots(slots, index)} weekday={weekdays[index]}
                                   slots={slot}/>
                </div>
              ))
            }
          </div>
        </div>
        <button className="btn btn-primary" type="button" onClick={saveSchedule}>
          {isLoading && <span className="absolute loading loading-spinner loading-md"></span>}
          <p className={`${isLoading ? "opacity-0" : "opacity-100"}`}>Save Schedule</p>
        </button>

      </div>
    </div>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Settings;
