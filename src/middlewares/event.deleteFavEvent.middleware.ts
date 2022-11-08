import { NextFunction, Request, Response } from "express";
import { FavEventSchema, FavEvent } from "../models/favEventModel";

export const deleteFavEventMiddleware = async (
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

  const favEvents = await FavEvent.find();

  const favEvent = favEvents.find(
    (favEvent: any) => favEvent.event_id == event_id
  );

  if (!favEvent) {
    return res.status(400).json({ message: "Este evento no existe" });
  }

  next();
};
