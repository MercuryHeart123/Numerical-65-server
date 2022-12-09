import Express, { Router } from "express";
import * as apiController from "../controllers/apicontroller"
import { verifyAdmin, verifyUser } from "../services/authService";
const router: Router = Express.Router()

router.get('/test', verifyUser, apiController.Test)
router.get('/admin', verifyAdmin, apiController.TestAdmin)

export { router as apiRouter }