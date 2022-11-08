import { NextFunction, Request, Response } from "express";
import { Event } from "../models";
import { EventSchema } from "../models/eventModel";
import { Faculty } from "../models/facModel";

export const eventFilterController = async (
  req: Request<
    {},
    {},
    {},
    {
      faculty_id?: string;
      program_id?: string;
    }
  >,
  res: Response,
  next: NextFunction
) => {
  const { faculty_id, program_id } = req.query;

  const faculties = await Faculty.find({});

  const faculty = faculties.find((faculty: any) => faculty._id == faculty_id);

  if (!faculty) {
    return res.status(400).json({ message: "Esta facultad no existe" });
  }

  if (program_id) {
    const program = faculty?.programs.find(
      (program) => program.id == program_id
    );

    if (!program) {
      return res.status(400).json({ message: "Este programa no existe" });
    }

    Event.find(
      {
        fac: faculty.name,
        prog: program.name,
      },
      (err: unknown, events: Event[]) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(events);
        }
      }
    );
  }

  if (faculty && !program_id) {
    Event.find(
      {
        fac: faculty.name,
      },
      (err: unknown, events: Event[]) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(events);
        }
      }
    );
  }
};
