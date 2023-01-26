import { NextFunction, Request, Response } from "express";
import { FavEventSchema } from "../models/favEventModel";
import { ScheduledEvent } from "../models/scheduledEventModel";

export const deleteScheduleEventController = async (
  req: Request<{}, {}, {}, FavEventSchema>,
  res: Response,
  next: NextFunction
) => {
  const scheduleEvents = await ScheduledEvent.deleteOne({
    event_id: req.query.event_id,
    user_id: req.user.user._id,
  });

  res.status(200).json({ scheduleEvents });
};
