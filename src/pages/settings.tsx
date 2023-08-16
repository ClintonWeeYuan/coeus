import { ReactElement, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import { GrAdd } from "react-icons/gr";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const Settings: NextPageWithLayout = () => {

  const [checkedState, setCheckedState] = useState(
    new Array(7).fill(false)
  );

  const handleOnChange = (position : number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="">
      <div className="py-6 px-8">
        <p className="header">Settings</p>
      </div>

      <div className="px-8">
        <p>Which days are you available?</p>
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
        <div className="flex flex-col">
          {
            weekdays.map((weekday, index) => checkedState[index] && (
              <div key={weekday} className="px-2 py-4 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 flex justify-center select-none cursor-pointer rounded-lg border-2 border-primary-200
                    py-3 px-6 font-bold text-primary-200 transition-colors duration-200 ease-in-out peer-checked:bg-primary-200 peer-checked:text-primary-700 peer-checked:border-primary-200">{weekday}</div>
                <div className="relative bg-gray-200 rounded-lg col-span-9 h-full">
                  <div className="absolute left-20 px-4 flex items-center h-full rounded-lg bg-primary-700 text-white"><p>7:00 - 11:00</p></div>
                </div>
                <div className="col-span-1"><button className="btn btn-accent btn-circle"><GrAdd className=""/></button></div>
              </div>
            ))
          }
        </div>


      </div>
    </div>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Settings;
