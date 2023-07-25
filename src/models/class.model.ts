import mongoose, { Schema, model } from 'mongoose';
import { z } from 'zod';

const ClassEnum = z.enum(['Group', 'Personal']);
export type ClassType = z.infer<typeof ClassEnum>;

const AlertEnum = z.enum(['5 minutes', '1 day', '2 days', 'morning of']);
export type AlertType = z.infer<typeof AlertEnum>;

export interface IClass {
    owner?: mongoose.Schema.Types.ObjectId;
    type: ClassType;
    name: string;
    startTime: Date;
    endTime: Date;
    alert: AlertType;
    link: string;
}

const classSchema = new Schema<IClass>({
    owner: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    alert: {
        type: String,
        required: false,
    },
    link: {
        type: String,
        required: false,
    },
});

const classModel = () => {
    return mongoose.models && mongoose.models.Class
        ? (mongoose.models.Class as mongoose.Model<IClass>)
        : model<IClass>('Class', classSchema);
};

export default classModel;
