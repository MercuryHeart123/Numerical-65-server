import { Request, Response } from "express";
import * as userServices from '../services/authService';

interface responseReturn {
    status: string
    success: boolean
    msg: string
    data?: Object
}


export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
}

export const postLogin = async (req: Request, res: Response) => {
    var response: responseReturn
    try {
        const foundUser = await userServices.login(req.body);
        response = {
            status: 'success',
            success: true,
            msg: 'Login successful',
            data: foundUser
        }
        res.status(200).send(response);
    } catch (error) {
        response = {
            status: 'error',
            success: false,
            msg: getErrorMessage(error)
        }
        return res.status(500).send(response);
    }

}

export const registerOne = async (req: Request, res: Response) => {
    var response: responseReturn
    try {
        await userServices.register(req.body);
        response = {
            status: 'success',
            success: true,
            msg: 'User registered successfully'
        }
        res.status(200).send(response);
    } catch (error) {
        response = {
            status: 'error',
            success: false,
            msg: getErrorMessage(error)
        }
        return res.status(500).send(response);
    }
};
