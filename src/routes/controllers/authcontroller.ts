import { Request, Response } from "express";
import * as userServices from '../services/authService';
import { getErrorMessage } from "../../utill/errUtill";
interface responseReturn {
    status: string
    success: boolean
    msg: string
    data?: Object
}

export const loginVerify = async (req: Request, res: Response) => {
    var response: responseReturn
    try {
        let decoded = await userServices.verifyToken(req);

        response = {
            status: 'success',
            success: true,
            msg: 'verify token success',
            data: {
                username: (<any>decoded).username,
                isAdmin: (<any>decoded).isAdmin
            }
        }
        return res.status(200).send(response);

        // next();
    } catch (error) {
        response = {
            status: 'error',
            success: false,
            msg: getErrorMessage(error)
        }
        return res.status(401).send(response);
    }
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
        console.log(response);

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

export const registerOne = async (req: Request, res: Response) => {
    var response: responseReturn
    try {
        await userServices.register(req.body);
        response = {
            status: 'success',
            success: true,
            msg: 'User registered successfully'
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
};
