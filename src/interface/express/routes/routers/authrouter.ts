import Express, { Router } from "express";
import { authController } from "../controllers/authcontroller"

export const authRouter = (AuthController: authController) => {
    const router: Router = Express.Router()

    router.get('/login', AuthController.loginVerify)
    router.post('/login', AuthController.postLogin)
    router.post('/register', AuthController.registerOne)
    return router
}



