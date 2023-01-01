import { apiUseCase } from "../../../../use_case/apiUseCase"
import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "../../utill/errUtill";
import { responseReturn } from "../../utill/interface";

export class apiController {
    private useCase: apiUseCase
    constructor(useCase: apiUseCase) {
        this.useCase = useCase
    }

    public listMethod = async (req: Request, res: Response, next: NextFunction) => {
        let response: responseReturn
        try {
            let allMethod = await this.useCase.listAllMethod();

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

    public updateMethodById = async (req: Request, res: Response) => {
        let response: responseReturn
        try {
            let user = req.body
            let updated = await this.useCase.updateMethodById(user);
            // broadcast(`Method ${updated.methodName} is now : ${updated.available ? 'available' : 'unavailable'}`)
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
}
