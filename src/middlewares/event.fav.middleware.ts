import { NextFunction, Request, Response } from "express";
import { FavEvent } from "../models/favEventModel";
import { Event } from "../models/eventModel";
import { FavEventRequest } from "../controllers/events.addFav.controller";

export const addEventToFavoriteMiddleware = async (
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

  const favEvents = await FavEvent.find();

  const favEvent = favEvents.find(
    (favEvent: any) => (favEvent.event_id == event_id && favEvent.user_id == req.user.user._id)
  );



  if (favEvent) {
    return res
      .status(400)
      .json({ message: "Este evento ya fue añadido a favoritos" });
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
