import Express, { Router } from "express";
import * as apiController from "../controllers/apicontroller"
import { verifyAdmin, verifyUser } from "../services/authService";
const router: Router = Express.Router()

router.get('/test', apiController.Test)
router.get('/listMethod', apiController.listMethod)
router.post('/updateMethodById', verifyAdmin, apiController.updateMethodById)
router.get('/admin', verifyAdmin, apiController.TestAdmin)

export { router as apiRouter }