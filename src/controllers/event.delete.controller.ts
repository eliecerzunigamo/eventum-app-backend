import { NextFunction, Request, Response } from "express";
import { DeleteEvent, Event } from "../models";

export const deleteEventController = async (
  req: Request<{}, {}, {}, DeleteEvent>,
  res: Response,
  next: NextFunction
) => {
  const event = await Event.deleteOne({
    _id: req.query.event_id,
    creator_id: req.user.user.email,
  });

  console.log(event)

  res.status(200).json({ event });
};
