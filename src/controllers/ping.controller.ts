import { Request, Response } from "express";

export const pingHandler = (_req: Request, res: Response) => {
  res.send("pong");
};
