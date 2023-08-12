import mongoose, { Schema, model } from 'mongoose';

export interface IPage {
    owner: mongoose.Schema.Types.ObjectId;
    title: string;
    content: JSON;
}

const pageSchema = new Schema<IPage>({
    owner: {
        ref: 'Page',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content : {
        type: Object,
        required: true,
    },
});

const pageModel = () => {
    return mongoose.models && mongoose.models.Page
        ? (mongoose.models.Page as mongoose.Model<IPage>)
        : model<IPage>('Page', pageSchema);
};

export default pageModel;
