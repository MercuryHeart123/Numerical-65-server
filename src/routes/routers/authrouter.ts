import Express, { Router } from "express";
import * as authController from "../controllers/authcontroller"
const router: Router = Express.Router()

router.post('/login', authController.postLogin)
router.post('/register', authController.registerOne)


export { router as authRouter }