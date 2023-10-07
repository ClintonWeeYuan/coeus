import { FC, useState } from "react";
import Backdrop from "@/components/common/Backdrop";
import { GrAdd } from "react-icons/gr";
import { motion } from 'framer-motion';

import { dropIn } from "@/lib/animations";
import TimePicker from "@/components/settings/TimePicker";
import {AiOutlineMinus} from "react-icons/ai"
import { MdEdit } from "react-icons/md";

interface Props {
  weekday: string
  slots: any[]
  updateSlots: (slots: any[]) => void
}

const CreateSlotModal: FC<Props> = ({ weekday, slots, updateSlots }) => {

  const [modalOpen, setModalOpen] = useState(false)

  const handleClose = () => {
    setModalOpen(false)
  }

  const handleChangeStart = (value: number, index: number) => {
    const newSlots = [...slots];
    newSlots[index].start = value;
    if(newSlots[index].start > newSlots[index].end){

      newSlots[index].end = newSlots[index].start;
    }
    updateSlots(newSlots);
  }

  const handleChangeEnd = (value: number, index: number) => {
    const newSlots = [...slots]
    newSlots[index].end = value
    if(newSlots[index].start > newSlots[index].end){
      console.log("HELLO THERE")
      newSlots[index].start = newSlots[index].end
    }
    updateSlots(newSlots);
  }

  const removeSlot = (index: number): void => {
    const newSlots = [...slots]
    newSlots.splice(index, 1)
    updateSlots(newSlots)
  }

  const addSlot = () => {
    const newSlots = [...slots];

    if(newSlots.length == 0){
      newSlots.push({ start: 20, end: 21 })
    } else {
      const newStart = newSlots[newSlots.length - 1].end
      const newEnd = newStart === 47 ? 47 : newStart + 1
      newSlots.push({ start: newStart, end: newEnd })
    }

    updateSlots(newSlots)
  }

  return (
    <>
      <div className="ml-0 col-span-2 md:col-span-1">
        <button className="btn btn-square btn-ghost" type="button" onClick={() => setModalOpen(true)}><MdEdit
          className=""/>
        </button>
      </div>
      {modalOpen && (
        <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-lg px-10 py-6 w-full md:w-2/5"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className="text-xl">{weekday}</p>
            {slots.map((slot, index) => (
              <div key={index} className="grid grid-cols-8 items-center py-2 gap-2">
                <TimePicker className="col-span-3" value={slot.start}
                            handleChange={(value: number) => handleChangeStart(value, index)}/>
                <p className="col-span-1 text-center"> to </p>
                <TimePicker className="col-span-3" value={slot.end}
                            handleChange={(value: number) => handleChangeEnd(value, index)}/>

                <button className="btn btn-error btn-circle btn-sm ml-2" type="button" onClick={() => removeSlot(index)}><AiOutlineMinus
                  className=""/></button>

              </div>
            ))}

            <div className="pt-4 flex justify-center">
              <button className="btn btn-accent btn-circle btn-md" type="button" onClick={addSlot}><GrAdd
                className=""/></button>
            </div>
          </motion.div>
        </Backdrop>
      )
      }

    </>
  )
}

export default CreateSlotModal