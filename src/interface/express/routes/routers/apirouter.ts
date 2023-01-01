import Express, { Router } from "express";
import { apiController } from "../controllers/apicontroller"
import { authController } from "../controllers/authcontroller";

export const apiRouter = (ApiController: apiController, AuthController: authController) => {
    const router: Router = Express.Router()

    router.get('/listMethod', ApiController.listMethod)
    router.post('/updateMethodById', AuthController.verifyAdmin, ApiController.updateMethodById)

    return router
}





// import Express, { Router } from "express";
// import * as apiController from "../controllers/apicontroller"
// import { verifyAdmin, verifyUser } from "../services/authService";
// const router: Router = Express.Router()

// router.get('/test', apiController.Test)
// router.get('/listMethod', apiController.listMethod)
// router.post('/updateMethodById', verifyAdmin, apiController.updateMethodById)
// router.get('/admin', verifyAdmin, apiController.TestAdmin)

// export { router as apiRouter }