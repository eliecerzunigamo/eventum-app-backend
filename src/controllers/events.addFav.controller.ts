import { NextFunction, Request, Response } from "express";
import { FavEventSchema, FavEvent } from "../models/favEventModel";
import admin from 'firebase-admin'
import { ConditionMessage } from 'firebase-admin/lib/messaging/messaging-api';
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

  const event = await Event.findOne(
    {
      _id: event_id
    }
  )

  const favEvent = new FavEvent({
    event_id,
    user_id: _id,
  });

  const date = new Date( event!.date! +"T"+ event!.time! + ":00"+".000Z").getTime();
  const adjust = 1000 * 60* 60* 5 ;
 
  setTimeout(() => {
    const payload = {
      notification: {
        title: event!.title,
        body: "Este evento esta a punto de comenzar",
      },
    };

  admin.messaging()
    .sendToDevice(token,
    payload).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    }
    );
  }, new Date(date + adjust).getTime() - new Date().getTime());

  favEvent
    .save()
    .then((favEvent) => {
      res.status(201).json(favEvent);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
