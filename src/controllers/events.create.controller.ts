import { NextFunction, Request, Response } from "express";
import { Event, EventSchema } from "../models";
import fs from "fs";

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
  const event = new Event({
    ...req.body,
    date: localDate,
    time: localTime,
    image_path: image ? `${fileName}` : null,
  });
  event
    .save()
    .then((event) => {
      res.status(201).json(event);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
