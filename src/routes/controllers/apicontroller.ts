import { Request, Response } from "express";

export const Test = (req: Request, res: Response): Object => {
    return res.json(req.query);
}

