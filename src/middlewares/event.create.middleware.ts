import { NextFunction, Request, Response } from "express";
import { EventSchema } from "../models";
import { Faculty, FacultySchema, facultySchema } from "../models/facModel";
import { Roles } from "../utils/enums";

export const createEventMiddleware = async (
  req: Request<{}, {}, EventSchema, {}>,
  res: Response,
  next: NextFunction
) => {
  const {
    title,
    init_date,
    description,
    fac,
    prog,
    image,
    place,
    event_type,
    end_date,
  } = req.body;
  const { user } = req.user;

  if (user.user_type !== Roles.Director && user.user_type !== Roles.Teacher) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!title || !description || !event_type || !image) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese todos los campos" });
  }

  if (!/^[\s\S]{3,100}$/.test(title)) {
    return res
      .status(400)
      .send({ message: "El título debe tener entre 3 y 100 caracteres" });
  }

  if (!/^[\s\S]{3,10000}$/.test(description)) {
    return res
      .status(400)
      .send({ message: "El título debe tener entre 3 y 10000 caracteres" });
  }

  const facs = await Faculty.find({});

  if (!facs.find((f: any) => f.name === fac)) {
    return res.status(400).send({ message: "La facultad no es válida" });
  }

  if (
    !facs
      .find((f: any) => f.name === fac)!
      .programs.find((p: any) => p.name === prog)
  ) {
    return res.status(400).send({ message: "El programa no es válido" });
  }

  if (event_type === "event") {
    if (!init_date) {
      return res
        .status(400)
        .send({ message: "Por favor ingrese la fecha de inicio del evento" });
    }

    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(init_date)) {
      return res.status(400).send({
        message: "La fecha debe tener un formato aaaa/mm/ddThh:mm:ss.mssZ",
      });
    }

    if (end_date) {
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(end_date)) {
        return res.status(400).send({
          message: "La fecha debe tener un formato aaaa/mm/ddThh:mm:ss.mssZ",
        });
      }
    }

    if (!place) {
      return res
        .status(400)
        .send({ message: "Por favor ingrese el lugar del evento" });
    }

    if (!/^[\s\S]{3,100}$/.test(place)) {
      return res
        .status(400)
        .send({ message: "El lugar debe tener entre 3 y 100 caracteres" });
    }
  }

  next();
};
