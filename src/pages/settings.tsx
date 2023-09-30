import { ReactElement, useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import AvailableHoursBar from "@/components/settings/AvailableHoursBar";
import CreateSlotModal from "@/components/settings/CreateSlotModal";
import { trpc } from "@/utils/trpc";
import useUser from "@/components/hooks/useUser";
import TimezoneSelect from "@/components/common/TimezoneSelect";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const Settings: NextPageWithLayout = () => {
  const { user } = useUser()

  const { data } = trpc.user.getUserSchedule.useQuery(user?.id || -1)

  const { mutateAsync } = trpc.user.editUser.useMutation()

  const [checkedState, setCheckedState] = useState(
    [...new Array(7)].map(() => false)
  );

  const [slots, setSlots] = useState(checkedState.map((state) => state ? [{ start: 7, end: 12 }] : []))
  const [timezone, setTimezone] = useState<string>(data?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone);

  useEffect(() => {
    const userSchedule = data ? JSON.parse(data.schedule as string) : [];

    const initialCheckedState = [...checkedState];

    for(let i = 0; i < userSchedule.length; i++){
      if(userSchedule[i].length > 0){
        initialCheckedState[i] = true
      } else {
        initialCheckedState[i] = false;
      }
    }

    setCheckedState(initialCheckedState)

    setSlots(userSchedule);
  }, [data])

  useEffect(() => {
    const updatedSlots = slots.map((slot, index) => {
      if (checkedState[index] && slot.length == 0) {
        return [{ start: 7, end: 12 }]
      } else {
        return slot
      }
    })

    setSlots(updatedSlots);
  }, [checkedState])

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  const updateSlots = (updatedSlots: any[], index: number) => {
    const newSlots = [...slots];
    newSlots[index] = [...updatedSlots];
    setSlots(newSlots);
  }

  const saveSchedule = async () => {
    const jsonSlots = JSON.stringify(slots);
    await mutateAsync({ id: user?.id || 0, schedule: jsonSlots, timezone: timezone })
  }

  return (
    <div className="">

      <div className="py-6 px-8">
        <p className="header">Settings</p>
      </div>

      <div className="px-8">
        <p className="py-4">Which timezone are you in?</p>
        <TimezoneSelect defaultTimezone={timezone} onChange={(newTimezone : string) => setTimezone(newTimezone)}/>
        <p className="py-4">Which days are you available?</p>
        <div className="flex mb-8">
          {
            weekdays.map((weekday, index) => (
              <div key={weekday} className="px-2 py-4">
                <input type="checkbox" id={weekday} className="peer hidden" checked={checkedState[index]}
                       onChange={() => handleOnChange(index)}/>
                <label htmlFor={weekday} className="w-32 select-none cursor-pointer rounded-lg border-2 border-primary-200
                    py-3 px-6 font-bold text-primary-200 transition-colors duration-200 ease-in-out peer-checked:bg-primary-200 peer-checked:text-primary-700 peer-checked:border-primary-200 ">{weekday}</label>
              </div>
            ))
          }
        </div>


        <p>Which times are you available?</p>
        <div className="flex flex-col overflow-x-auto mb-8">
          {
            weekdays.map((weekday, index) => checkedState[index] && (
              <div key={weekday} className="px-2 py-4 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 flex justify-center select-none cursor-pointer rounded-lg border-2 border-primary-200
                    py-3 px-6 font-bold text-primary-200 transition-colors duration-200 ease-in-out peer-checked:bg-primary-200 peer-checked:text-primary-700 peer-checked:border-primary-200">{weekday}</div>
                <AvailableHoursBar slots={slots[index]}/>
                <CreateSlotModal updateSlots={(slots) => updateSlots(slots, index)} weekday={weekday}
                                 slots={slots[index]}/>
              </div>
            ))
          }
        </div>

        <button className="btn btn-primary" type="button" onClick={saveSchedule}>Save Schedule</button>


      </div>
    </div>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Settings;
