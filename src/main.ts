import Express, { Application, Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import { mainRouter } from './routes'
import * as database from './database'
import cors from 'cors'
import http, { Server } from 'http';
import { WebSocketService } from "./webSocket"

dotenv.config()
database.dbConnect()
var port = process.env.PORT
var app: Application = Express()
app.use(Express.urlencoded())
app.use(Express.json())
app.use(cors<Request>())



const server: Server = http.createServer(app);
const webSocket = new WebSocketService(server)
// webSocket.connect(server)
export { webSocket }

// let wss = StartWebSocketServer(server)

app.use(mainRouter)

app.use((req: Request, res: Response) => {
    res.status(404).send("Error 404 not found")
})
server.listen(port, () => {
    console.log(`server start at : http://localhost:${port}`)
})