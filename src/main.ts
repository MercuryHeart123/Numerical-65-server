import Express, { Application, Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import { mainRouter } from './routes'
import * as database from './database'

dotenv.config()
database.dbConnect()
var port = process.env.PORT
var app: Application = Express()
app.use(Express.urlencoded())
app.use(Express.json())

app.use(mainRouter)

app.use((req: Request, res: Response) => {
    res.status(404).send("Error 404 not found")
})

app.listen(port, () => {
    console.log(`server start at : http://localhost:${port}`)
})