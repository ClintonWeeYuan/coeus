import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import useUser from '@/components/hooks/useUser';
import { trpc } from '@/utils/trpc';
import { ClassType, newClassSchema } from '@/lib/validationSchema';
import CustomDatePicker from '@/components/common/DatePicker';
import { GrAdd } from 'react-icons/gr';
import { zodResolver } from '@hookform/resolvers/zod';
import { classDefaultValues } from '@/lib/defaultValues';

const CreateClassModal: FC = () => {
    return (
        <div className="flex justify-end">
            {/* The button to open modal */}
            <label htmlFor="my_modal_6" className="btn btn-circle btn-accent">
                <GrAdd />
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box overflow-visible">
                    <label
                        htmlFor="my_modal_6"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <CreateClassForm />
                </div>
            </div>
        </div>
    );
};

export type FormValues = {
    owner: string;
    name: string;
    type: string;
    startTime: Date;
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

    const { mutate } = trpc.class.createClass.useMutation();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        data.owner = user?.id || '';
        // const now = new Date();
        const newClassData: ClassType = {
            ...data,
        };
        console.log(newClassData);
        // mutate(newClassData);
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
                    <option selected>5 minutes</option>
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
                    <button type="submit" className="btn btn-primary">
                        Schedule Class
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default CreateClassModal;
