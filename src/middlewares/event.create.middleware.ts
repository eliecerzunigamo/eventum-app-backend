import { NextFunction, Request, Response } from "express";
import { EventSchema } from "../models";
import { Faculty, FacultySchema, facultySchema } from "../models/facModel";
import { Roles } from "../utils/enums";

export const createEventMiddleware = async (
  req: Request<{}, {}, EventSchema, {}>,
  res: Response,
  next: NextFunction
) => {
  const { title, date, description, fac, prog, time, image } = req.body;
  const { user } = req.user;

  if (user.user_type !== Roles.Director) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!title || !date || !description || !fac || !prog || !time) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese todos los campos" });
  }

  if (!/^[\s\S]{3,50}$/.test(title)) {
    return res
      .status(400)
      .send({ message: "El título debe tener entre 3 y 20 caracteres" });
  }

  if (!/^[\s\S]{3,500}$/.test(description)) {
    return res
      .status(400)
      .send({ message: "El título debe tener entre 3 y 500 caracteres" });
  }

  if (!/^(\d{4}-)+(\d{2}-)+(\d{2})$/.test(date)) {
    return res
      .status(400)
      .send({ message: "La fecha debe tener un formato aaaa-mm-dd" });
  }

  if (!/^(\d{2}:)+(\d{2})$/.test(time)) {
    return res
      .status(400)
      .send({ message: "La hora debe tener un formato hh:mm" });
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

  next();
};
