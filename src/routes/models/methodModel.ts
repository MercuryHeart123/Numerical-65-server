import mongoose from 'mongoose';

export interface I_MethodDocument extends mongoose.Document {
    methodName: string;
    available: boolean;
    processTime: number;
}

const MethodSchema: mongoose.Schema<I_MethodDocument> = new mongoose.Schema({
    methodName: { type: String, index: true, unique: true },
    available: { type: Boolean, default: true },
    processTime: { type: Number, default: 0 }
});


export const MethodModel = mongoose.model<I_MethodDocument>('method', MethodSchema);
