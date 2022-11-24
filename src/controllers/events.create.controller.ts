import { NextFunction, Request, Response } from "express";
import { Event, EventSchema } from "../models";
import fs from "fs";
import admin from 'firebase-admin'
import { ConditionMessage } from 'firebase-admin/lib/messaging/messaging-api';

export const eventCreateController = (
  req: Request<{}, {}, EventSchema, {}>,
  res: Response,
  next: NextFunction
) => {
  const { image, date } = req.body;

  const imagePath = image?.split("data:image/")[1].split(";")[0];
  const id = Math.random().toString(36).substring(2, 9);
  const fileName = `${id}.${imagePath}`;

  if (image) {
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFile(`public/uploads/${fileName}`, base64Data, "base64", (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error al guardar la imagen" });
      }
    });
  }
  const adjustedDate = new Date(new Date(date).getTime() - 1000 * 60 * 60 * 5);
  const localDate = adjustedDate.toJSON().split("T")[0];
  const localTime = adjustedDate.toJSON().split("T")[1].split(".")[0].slice(0, 5);
 
  const timer = new Date(new Date(date).getTime() - 1000*60*30).getTime() - new Date().getTime()

  

  const event = new Event({
    ...req.body,
    date: localDate,
    time: localTime,
    created_at: new Date().toISOString(),
    image_path: image ? `${fileName}` : null,
  });
  event
    .save()
    .then((event) => {
      res.status(201).json(event);
      setTimeout(() => {
        const payload = {
          notification: {
            title: req.body.title,
            body: "Este evento esta a punto de comenzar",
          },
        };
    
      admin.messaging()
        .sendToTopic("e"+event._id,
        payload).then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        }
        );
      }, timer);
    
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
