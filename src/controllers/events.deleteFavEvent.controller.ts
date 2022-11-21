import { NextFunction, Request, Response } from "express";
import { Event } from "../models";
import { FavEventSchema, FavEvent } from "../models/favEventModel";

export const deleteFavEventController = async (
  req: Request<{}, {}, {}, FavEventSchema>,
  res: Response,
  next: NextFunction
) => {
  const favEvents = await FavEvent.deleteOne({ event_id: req.query.event_id , user_id: req.user.user._id});

  res.status(200).json({ favEvents });
};
