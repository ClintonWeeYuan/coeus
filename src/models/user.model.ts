import mongoose, { Schema, model } from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const userModel = () => {
    return mongoose.models && mongoose.models.User
        ? (mongoose.models.User as mongoose.Model<IUser>)
        : model<IUser>('User', userSchema);
};

export default userModel;
