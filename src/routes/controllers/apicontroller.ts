import { Request, Response } from "express";

export const Test = (req: Request, res: Response) => {
    return res.json({ data: 'test' });
}
export const TestAdmin = (req: Request, res: Response) => {
    return res.json({ data: 'test admin' });
}


