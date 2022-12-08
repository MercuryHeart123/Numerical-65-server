import Express, { Router } from "express";
import * as apiController from "../controllers/apicontroller"
const router: Router = Express.Router()

router.get('/test', apiController.Test)

export { router as apiRouter }