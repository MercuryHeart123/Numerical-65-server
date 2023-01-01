import Express, { Application, Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import { mainRouter } from './routes'
import cors from 'cors'
import http, { Server } from 'http';
import { Config } from "../../main"
import { UseCase } from "../../use_case/useCase";
// import { WebSocketService } from "./webSocket"

// dotenv.config()
// database.dbConnect()

export class expressServer {
    private app: Application
    private server: Server
    private port: string
    constructor(useCase: UseCase, cfg: Config) {
        this.app = Express()
        this.app.use(Express.urlencoded())
        this.app.use(Express.json())
        this.app.use(cors<Request>())
        this.server = http.createServer(this.app)
        this.port = cfg.PORT
        this.app.use(mainRouter(useCase))

        this.app.use((req: Request, res: Response) => {
            res.status(404).send("Error 404 not found")
        })
    }
    public start() {
        this.server.listen(this.port, () => {
            console.log(`server start at : http://localhost:${this.port}`)
        })
    }
}