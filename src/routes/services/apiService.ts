import { MethodModel } from '../models/methodModel';

export const listAllMethod = async () => {
    const allMethod = await MethodModel.find();
    return allMethod;
}

export const updateMethodById = async (body: { methodId: string, available: boolean }) => {
    try {
        let update = { available: body.available };
        let updated = await MethodModel.findOneAndUpdate({ _id: body.methodId },
            update,
            { new: true }
        )
        if (!updated) {
            throw new Error('Method not found');
        }
        return updated;
    }
    catch (error) {
        throw error;
    }
}