import { NextFunction, Request, Response } from "express";
import { Event } from "../models";
import { Faculty } from "../models/facModel";

export const eventGetAllController = async (
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
      my_events?: boolean;
      event_type?: string;
    }
  >,
  res: Response,
  next: NextFunction
) => {
  const { size = 20, page = 1, faculty_id, program_id, query = "", my_events = false,event_type } = req.query;

  const faculty = await Faculty.findOne({
    _id: faculty_id,
  });
  const program = faculty
    ? faculty.programs.find((program) => program.id == program_id)
    : null;
  Event.find({
    fac: faculty
      ? faculty.name
      : {
          $exists: true,
        },
    prog: program
      ? program.name
      : {
          $exists: true,
        },
    creator_id: my_events ? req.user.user.email : {
      $exists: true,
    },
    event_type: event_type ? event_type : {
      $exists: true,
    },
    title: { $regex: query, $options: "i" },
  })
    .limit(size)
    .skip(size * (page - 1))
    .then((events) => {
      return res
        .status(200)
        .json(
          events.sort(
            (a, b) =>
              new Date(b.created_at!).getTime() -
              new Date(a.created_at!).getTime()
          )
        );
    });
};
