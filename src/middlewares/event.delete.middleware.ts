import { NextFunction, Request, Response } from "express";
import { Event } from "../models";
import { DeleteEvent } from '../models/eventModel';



export const deleteEventMiddleware = async (
  req: Request<{}, {}, {}, DeleteEvent>,
  res: Response,
  next: NextFunction
) => {
  const { event_id } = req.query;

  if (!event_id) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese todos los campos" });
  }

  const event = await Event.findOne({
    _id: event_id,
  });


  if (!event) {
    return res.status(400).json({ message: "Este evento no existe" });
  }

  if (event.creator_id != req.user.user.email) {
    return res.status(400).json({ message: "No tienes permisos para eliminar este evento" });
  }

  next();
};
