import mongoose, { Document, Schema } from "mongoose";

export interface IImage extends Document {
    filename: string;
    contentType: string;
    uploadDate: Date;
}

const ImageSchema = new Schema<IImage>({
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now }
});

export default mongoose.model<IImage>("Image", ImageSchema, "db-manage-file");