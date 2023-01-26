import { NextFunction, Request, Response } from "express";
import { FavEventSchema, FavEvent } from "../models/favEventModel";
import { ScheduledEvent } from "../models/scheduledEventModel";

export interface FavEventRequest extends FavEventSchema {
  token: string;
}

export const addEventToScheduleController = async (
  req: Request<{}, {}, FavEventRequest, {}>,
  res: Response,
  next: NextFunction
) => {
  const { event_id } = req.body;
  const { _id } = req.user.user;

  const scheduledEvent = new ScheduledEvent({
    event_id,
    user_id: _id,
  });

  scheduledEvent
    .save()
    .then((scheduledEvent) => {
      res.status(201).json(scheduledEvent);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
