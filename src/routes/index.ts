import Express, { Router } from "express";
import { apiRouter } from './routers/apirouter'
import { authRouter } from './routers/authrouter'
const router: Router = Express.Router()

router.use('/api', apiRouter)
router.use('/auth', authRouter)

export { router as mainRouter }