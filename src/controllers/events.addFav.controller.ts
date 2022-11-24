import { NextFunction, Request, Response } from "express";
import { FavEventSchema, FavEvent } from "../models/favEventModel";
import { Event } from "../models";

export interface FavEventRequest extends FavEventSchema {
  token: string;
}


export const addEventToFavoriteController = async (
  req: Request<{}, {},FavEventRequest, {}>,
  res: Response,
  next: NextFunction
) => {
  const { event_id, token } = req.body;
  const { _id } = req.user.user;

  const favEvent = new FavEvent({
    event_id,
    user_id: _id,
  });

  favEvent
    .save()
    .then((favEvent) => {
      res.status(201).json(favEvent);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
