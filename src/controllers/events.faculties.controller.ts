import { NextFunction, Request, Response } from "express";
import { Faculty } from "../models/facModel";
import { EventSchema } from "../models/eventModel";

export const facultiesGetAllController = (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  Faculty.find({}, (err: unknown, events: EventSchema[]) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(events);
    }
  });
};
