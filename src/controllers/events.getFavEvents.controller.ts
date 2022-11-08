import { NextFunction, Request, Response } from "express";
import { Event, EventSchema } from "../models";
import { FavEventSchema, FavEvent } from "../models/favEventModel";

export const getFavEventsController = async (
  req: Request<{}, {}, FavEventSchema, {}>,
  res: Response,
  next: NextFunction
) => {
  
  const { _id } = req.user.user;

  const favEvents = await FavEvent.find({ user_id: _id });

  const events = await Event.find()

  const fav_events = favEvents.map((favEvent : any) => {
    const event = events.find((event : any) => event._id == favEvent.event_id);
    return { event }
  });

  res.status(200).json({ fav_events });

};
