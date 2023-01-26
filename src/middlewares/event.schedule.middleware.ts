import { NextFunction, Request, Response } from "express";
import { Event } from "../models/eventModel";
import { FavEventRequest } from "../controllers/events.addFav.controller";
import { ScheduledEvent } from "../models/scheduledEventModel";

export const addEventToScheduleMiddleware = async (
  req: Request<{}, {}, FavEventRequest, {}>,
  res: Response,
  next: NextFunction
) => {
  const { event_id, token } = req.body;

  const events = await Event.find();

  if (!token) {
    return res.status(400).json({ message: "El token es requerido" });
  }

  const event = events.find((event: any) => event._id == event_id);

  const scheduledEvents = await ScheduledEvent.find();

  const scheduledEvent = scheduledEvents.find(
    (scheduledEvents: any) =>
      scheduledEvents.event_id == event_id &&
      scheduledEvents.user_id == req.user.user._id
  );

  if (scheduledEvent) {
    return res
      .status(400)
      .json({ message: "Este evento ya fue añadido a agendados" });
  }

  if (!event) {
    return res.status(400).json({ message: "No se ha encontrado este evento" });
  }

  if (!event_id || !token) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese todos los campos" });
  }

  next();
};
