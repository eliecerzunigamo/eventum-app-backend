import { NextFunction, Request, Response } from "express";
import { FavEventSchema, FavEvent } from "../models/favEventModel";
import { Event } from "../models/eventModel";

export const addEventToFavoriteMiddleware = async (
  req: Request<{}, {}, FavEventSchema, {}>,
  res: Response,
  next: NextFunction
) => {
  const { event_id } = req.body;

  const events = await Event.find();

  const event = events.find((event: any) => event._id == event_id);

  const favEvents = await FavEvent.find();

  const favEvent = favEvents.find(
    (favEvent: any) => favEvent.event_id == event_id
  );

  if (favEvent) {
    return res
      .status(400)
      .json({ message: "Este evento ya fue añadido a favoritos" });
  }

  if (!event) {
    return res.status(400).json({ message: "No se ha encontrado este evento" });
  }

  if (!event_id) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese todos los campos" });
  }

  next();
};
