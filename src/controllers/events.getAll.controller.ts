import { NextFunction, Request, Response } from "express";
import { Event } from "../models";

export const eventGetAllController = (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  Event.find({}, (err: unknown, events: Event[]) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(events);
    }
  });
};
