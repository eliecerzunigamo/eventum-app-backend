import { NextFunction, Request, Response } from "express";
import { FavEventSchema } from "../models/favEventModel";
import { ScheduledEvent } from "../models/scheduledEventModel";

export const deleteScheduleEventMiddleware = async (
  req: Request<{}, {}, {}, FavEventSchema>,
  res: Response,
  next: NextFunction
) => {
  const { event_id } = req.query;

  if (!event_id) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese todos los campos" });
  }

  const scheduledEvents = await ScheduledEvent.find();

  const scheduledEvent = scheduledEvents.find(
    (favEvent: any) => favEvent.event_id == event_id
  );

  if (!scheduledEvent) {
    return res.status(400).json({ message: "Este evento no existe" });
  }

  next();
};
