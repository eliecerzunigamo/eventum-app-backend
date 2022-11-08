import { NextFunction, Request, Response } from "express";
import { FavEventSchema, FavEvent } from "../models/favEventModel";

export const addEventToFavoriteController = async (
  req: Request<{}, {}, FavEventSchema, {}>,
  res: Response,
  next: NextFunction
) => {
  const { event_id } = req.body;
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
