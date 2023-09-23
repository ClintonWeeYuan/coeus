import { ReactElement, useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import { GrAdd } from "react-icons/gr";
import AvailableHoursBar from "@/components/settings/AvailableHoursBar";
import CreateSlotModal from "@/components/settings/CreateSlotModal";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const Settings: NextPageWithLayout = () => {

  const [checkedState, setCheckedState] = useState(
    new Array(7).fill(false)
  );

  const [slots, setSlots] = useState(checkedState.map((state) => state ? [{start: 7, end: 12}] : []))

  useEffect(() => {
    const updatedSlots = slots.map((slot, index) => {
      if(checkedState[index] && slot.length == 0){
        return [{start: 7, end: 12}]
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

  const updateSlots = (updatedSlots : any[], index: number) => {
    const newSlots = [...slots];
    newSlots[index] = [...updatedSlots];
    setSlots(newSlots);
  }

  const saveSchedule = async () => {
    const jsonObject: { [key: number]: string; } = {};
    checkedState.forEach((state, index) => {
      if (state) {
        jsonObject[index] = "HELLO THERE"
      }
    })

    console.log(jsonObject)
  }

  return (
    <div className="">
      <div className="py-6 px-8">
        <p className="header">Settings</p>
      </div>

      <div className="px-8">
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
                <CreateSlotModal updateSlots={(slots) => updateSlots(slots, index)} weekday={weekday} slots={slots[index]}/>
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
