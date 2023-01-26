import { NextFunction, Request, Response } from "express";
import { Event } from "../models";
import { Faculty } from "../models/facModel";

export const eventGetAllMiddleware = async (
  req: Request<
    {},
    {},
    {},
    {
      size?: 20;
      page?: 1;
      faculty_id?: string;
      program_id?: string;
      query?: string;
      event_type?: string;
    }
  >,
  res: Response,
  next: NextFunction
) => {
  const { size = 20, page = 1, faculty_id, program_id, query = "",event_type } = req.query;

  if (page < 1) {
    return res.status(400).send("El numero pagina debe ser mayor a cero 0");
  }

  if (faculty_id) {
    const faculties = await Faculty.find({});
    const faculty = faculties.find((faculty: any) => faculty._id == faculty_id);

    if (!faculty) {
      return res.status(400).json({ message: "Esta facultad no existe" });
    }

    if (program_id) {
      const program = faculty.programs.find(
        (program) => program.id == program_id
      );

      if (!program) {
        return res.status(400).json({ message: "Este programa no existe" });
      }
    }
  };

  if(event_type){
    if(event_type != 'event' && event_type != 'new'){
      return res.status(400).json({ message: "Este tipo de evento no existe" });
    }
  }

  next();
};
