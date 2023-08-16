import { FC, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import useUser from '@/components/hooks/useUser';
import { trpc } from '@/utils/trpc';
import { ClassType, newClassSchema } from '@/lib/validationSchema';
import CustomDatePicker from '@/components/common/DatePicker';
import { zodResolver } from '@hookform/resolvers/zod';
import { classDefaultValues } from '@/lib/defaultValues';
import Backdrop from "@/components/common/Backdrop";
import { motion } from "framer-motion";
import { toast } from "sonner";
import LoadingButton from "@/components/common/LoadingButton";

const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0,
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: '100vh',
        opacity: 0,
    },
};

interface Props {
    handleClose : () => void
}
const CreateClassModal: FC<Props> = ({handleClose}) => {
    return (
      <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-lg px-10 py-6 w-full md:w-2/5"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
              <CreateClassForm />
          </motion.div>
      </Backdrop>
    );
};

export type FormValues = {
    owner: string;
    name: string;
    type: string;
    startTime: Date;
    endTime: Date;
    alert: string;
    link: string;
};

const CreateClassForm: FC = () => {
    const methods = useForm<ClassType>({
        resolver: zodResolver(newClassSchema),
        defaultValues: classDefaultValues,
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = methods;

    const { user } = useUser();

    const { mutateAsync } = trpc.class.createClass.useMutation({
        onSuccess: () => {
            toast.success("Class created!")
        },
        onError: () => {
            toast.error("Something went wrong...")
        },
        onSettled: () => {
            setIsLoading(false);
        }
    });
    const [duration, setDuration] = useState(30);

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true);

        data.owner = user?.id || '';

        //Set end time from duration
        const endTime = new Date(data.startTime.getTime());
        endTime.setMinutes(endTime.getMinutes() + duration);
        data.endTime = endTime;

        const newClassData: ClassType = {
            ...data,
        };
        await mutateAsync(newClassData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* CLASS NAME */}
                <div className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Enter name of class here..."
                        className="w-full text-2xl md:text-3xl max-w-sm border-0 ring-0 focus:ring-0"
                        {...register('name', { required: true })}
                    />
                    {errors.name && (
                        <span className="px-4 text-red-500">
                            This field is required
                        </span>
                    )}
                </div>

                {/* CLASS TYPE */}
                <label className="label">
                    <span>Type</span>
                </label>
                <select {...register('type')} className="custom-select">
                    <option>Group</option>
                    <option>Personal</option>
                </select>

                {/* START DATE */}
                <label className="label pb-0">
                    <span>Start Time</span>
                </label>
                <CustomDatePicker name="startTime" />

                {/* DURATION */}
                <label className="label pb-0">
                    <span>End Time</span>
                </label>
                <select
                    onChange={(e) =>
                        setDuration(parseInt(e.currentTarget.value))
                    }
                    className="custom-select"
                >
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1 hour 30 minutes</option>
                    <option value={120}>2 hours</option>
                    <option value={150}>2 hour 30 minutes</option>
                    <option value={180}>3 hours</option>
                </select>

                {/* STUDENT */}
                {/*<label className="label">*/}
                {/*    <span>Student</span>*/}
                {/*</label>*/}
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Type here"*/}
                {/*    className="custom-select"*/}
                {/*    {...register('student', { required: true })}*/}
                {/*/>*/}

                {/* REMINDER */}
                <label className="label">
                    <span>Reminder</span>
                </label>
                <select {...register('alert')} className="custom-select">
                    <option>5 minutes</option>
                    <option>1 day</option>
                </select>
                <label className="label">
                    <span>Link</span>
                </label>
                <input
                    type="text"
                    placeholder="http://zoom.com/room-code"
                    className="custom-select"
                    {...register('link', { required: true })}
                />
                <div className="modal-action py-4">
                    <LoadingButton
                      isLoading={isLoading}
                      text="Schedule Class"
                    />
                </div>
            </form>
        </FormProvider>
    );
};

export default CreateClassModal;
