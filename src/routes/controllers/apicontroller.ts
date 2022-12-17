import { NextFunction, Request, Response } from "express";
import { responseReturn } from "../../utill/interface";
import { getErrorMessage } from "../../utill/errUtill";
import * as apiService from '../services/apiService';
import { WebSocketService } from "../../webSocket"
import { broadcast } from "../../utill/broadcast";

export const Test = (req: Request, res: Response) => {
    return res.json({ data: 'test' });
}
export const TestAdmin = (req: Request, res: Response) => {
    return res.json({ data: 'test admin' });
}

export const listMethod = async (req: Request, res: Response, next: NextFunction) => {
    let response: responseReturn
    try {
        let allMethod = await apiService.listAllMethod();

        response = {
            status: 'success',
            success: true,
            msg: 'List method',
            data: allMethod
        }
        return res.status(200).send(response);
    } catch (error) {
        response = {
            status: 'error',
            success: false,
            msg: getErrorMessage(error)
        }
        return res.status(500).send(response);
    }
}

export const updateMethodById = async (req: Request, res: Response) => {
    let response: responseReturn
    try {


        let updated = await apiService.updateMethodById(req.body);
        broadcast(`Method ${updated.methodName} is now : ${updated.available ? 'available' : 'unavailable'}`)
        response = {
            status: 'success',
            success: true,
            msg: 'Method updated',
            data: updated
        }
        return res.status(200).send(response);
    } catch (error) {
        response = {
            status: 'error',
            success: false,
            msg: getErrorMessage(error)
        }
        return res.status(500).send(response);
    }
}

