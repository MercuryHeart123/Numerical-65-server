import Express, { Router } from "express";
import { UseCase } from "../../../use_case/useCase";
import { apiRouter } from './routers/apirouter'
import { authRouter } from './routers/authrouter'
import { authController } from "./controllers/authcontroller"
import { apiController } from "./controllers/apicontroller";

export const mainRouter = (useCase: UseCase) => {
    const router: Router = Express.Router()
    const AuthController = new authController(useCase.authUseCase)
    const ApiController = new apiController(useCase.apiUseCase)
    router.use('/api', apiRouter(ApiController, AuthController))
    router.use('/auth', authRouter(AuthController))
    return router
}

