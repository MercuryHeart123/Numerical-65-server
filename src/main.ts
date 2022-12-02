import Express, { Application, Request, Response, NextFunction } from "express";
var port: number = 8080;
var app: Application = Express();

app.get("/", (req: Request, res: Response, next: NextFunction): Object => {
    return res.json(req.query);
})

app.listen(port, () => {
    console.log("server start at port : ", port);
})