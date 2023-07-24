import { FC } from 'react';
import { useForm } from 'react-hook-form';
// import { trpc } from '@/utils/trpc';
// import { IClass } from '@/models/class.model';
// import { ObjectId } from 'bson';

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

const CreateClassForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // const { mutate } = trpc.class.createClass.useMutation();
    const onSubmit = () => {
        console.log('Hello There');
        // const data: IClass = {
        //     name: 'One on one with Zoe',
        //     owner: new ObjectId('64bc608fc14c3c7abc4a8be8'),
        // };
    };

    return (
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
                <span>Start Time</span>
            </label>
            <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
            />

            <label className="label">
                <span>End Time</span>
            </label>
            <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
            />
            <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CreateClassModal;
