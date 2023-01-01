import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../../utill/errUtill";
import { responseReturn } from "../../utill/interface";
// import { broadcast } from "../../utill/broadcast";
import { authUseCase } from "../../../../use_case/authUseCase";

export class authController {
    private useCase: authUseCase
    constructor(useCase: authUseCase) {
        this.useCase = useCase
    }
    public loginVerify = async (req: Request, res: Response) => {
        var response: responseReturn
        try {
            var token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) {
                throw new Error('Please authenticate');
            }
            let decoded = this.useCase.verifyToken(token);
            // broadcast(`User ${(<any>decoded).username} verify token`)
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
    public postLogin = async (req: Request, res: Response) => {
        var response: responseReturn
        try {
            let user = req.body
            const foundUser = await this.useCase.login(user);
            response = {
                status: 'success',
                success: true,
                msg: 'Login successful',
                data: foundUser
            }
            // broadcast(`User ${foundUser.username} login`)

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
    public registerOne = async (req: Request, res: Response) => {
        var response: responseReturn
        try {
            let username = req.body.username
            let foundUser = await this.useCase.findOne(username)
            if (foundUser) {
                response = {
                    status: 'error',
                    success: false,
                    msg: 'User already exist'
                }
                return res.status(500).send(response);
            }
            this.useCase.register(req.body);
            // broadcast(`User ${req.body.username} register`)
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

    public verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) {
                throw new Error('Please authenticate');
            }
            let decoded = this.useCase.verifyToken(token);
            if ((<any>decoded).isAdmin) {
                next();
            } else {
                throw new Error('You are not admin');
            }
        } catch (error) {
            res.status(401).send({ error: getErrorMessage(error) });
        }
    }

    public verifyUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) {
                throw new Error('Please authenticate');
            }
            let decoded = this.useCase.verifyToken(token);
            if ((<any>decoded).username) {
                next();
            } else {
                throw new Error('You are not user');
            }
        } catch (error) {
            res.status(401).send({ error: getErrorMessage(error) });
        }
    }
}
// export const loginVerify = async (req: Request, res: Response) => {
//     var response: responseReturn

//     try {
//         let decoded = await userServices.verifyToken(req);
//         broadcast(`User ${(<any>decoded).username} verify token`)
//         response = {
//             status: 'success',
//             success: true,
//             msg: 'verify token success',
//             data: {
//                 username: (<any>decoded).username,
//                 isAdmin: (<any>decoded).isAdmin
//             }
//         }
//         return res.status(200).send(response);

//         // next();
//     } catch (error) {
//         response = {
//             status: 'error',
//             success: false,
//             msg: getErrorMessage(error)
//         }
//         return res.status(401).send(response);
//     }
// }

// export const postLogin = async (req: Request, res: Response) => {
//     var response: responseReturn
//     try {
//         const foundUser = await userServices.login(req.body);
//         response = {
//             status: 'success',
//             success: true,
//             msg: 'Login successful',
//             data: foundUser
//         }
//         broadcast(`User ${foundUser.username} login`)

//         return res.status(200).send(response);
//     } catch (error) {
//         response = {
//             status: 'error',
//             success: false,
//             msg: getErrorMessage(error)
//         }
//         return res.status(500).send(response);
//     }

// }

// export const registerOne = async (req: Request, res: Response) => {
//     var response: responseReturn
//     try {
//         await userServices.register(req.body);
//         broadcast(`User ${req.body.username} register`)
//         response = {
//             status: 'success',
//             success: true,
//             msg: 'User registered successfully'
//         }
//         return res.status(200).send(response);
//     } catch (error) {
//         response = {
//             status: 'error',
//             success: false,
//             msg: getErrorMessage(error)
//         }
//         return res.status(500).send(response);
//     }
// };
