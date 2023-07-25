import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import useUser from '@/components/hooks/useUser';
import { trpc } from '@/utils/trpc';
import { ClassType } from '@/lib/validationSchema';
import CustomDatePicker from '@/components/common/DatePicker';

const CreateClassModal: FC = () => {
    return (
        <>
            {/* The button to open modal */}
            <label htmlFor="my_modal_6" className="btn btn-accent">
                Add Class
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label
                        htmlFor="my_modal_6"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="font-bold text-lg mb-4">
                        Create a New Class!
                    </h3>
                    <CreateClassForm />
                </div>
            </div>
        </>
    );
};

export type FormValues = {
    name: string;
    type: string;
    startTime: Date;
    endTime: Date;
    alert: string;
    link: string;
};

const CreateClassForm: FC = () => {
    const methods = useForm<ClassType>({
        // resolver: zodResolver(newClassSchema),
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = methods;

    const { user } = useUser();

    const { mutate } = trpc.class.createClass.useMutation();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(typeof user?.id);
        console.log(data);
        // const now = new Date();
        const newClassData: ClassType = {
            owner: user?.id || '',
            ...data,
        };
        // console.log(newClassData);
        mutate(newClassData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col px-2">
                    <label className="label py-0">Name of Class</label>
                    <input
                        type="text"
                        placeholder="Private Math Tutoring with Stuart..."
                        className="input input-bordered w-full max-w-xs"
                        {...register('name', { required: true })}
                    />
                    {errors.name && (
                        <span className="px-4 text-red-500">
                            This field is required
                        </span>
                    )}
                </div>
                <label className="label">
                    <span>Type</span>
                </label>
                <select
                    {...register('type')}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option selected>Group</option>
                    <option>Personal</option>
                </select>

                <label className="label">
                    <span>Start Time</span>
                </label>
                <CustomDatePicker name="startTime" />

                <label className="label">
                    <span>End Time</span>
                </label>
                <CustomDatePicker name="endTime" />
                <label className="label">
                    <span>Reminder</span>
                </label>
                <select
                    {...register('alert')}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option disabled selected>
                        None
                    </option>
                    <option>5 minutes</option>
                    <option>1 day</option>
                </select>
                <label className="label">
                    <span>Link</span>
                </label>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    {...register('link', { required: true })}
                />
                <div className="modal-action">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default CreateClassModal;
