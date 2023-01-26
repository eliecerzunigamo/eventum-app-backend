import { NextFunction, Request, Response } from "express";
import { Event, Faculty } from "../models";
import { FavEvent } from "../models/favEventModel";

export const getFavEventsController = async (
  req: Request<
    {},
    {},
    {},
    {
      size?: 20;
      page?: 1;
      faculty_id?: string;
      program_id?: string;
      event_id?: string;
      query?: string;
    }
  >,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user.user;
  const {
    size = 20,
    page = 1,
    faculty_id,
    program_id,
    query = "",
    event_id = "",
  } = req.query;

  const favEvents = await FavEvent.find({ user_id: _id });

  if (page < 1) {
    return res.status(400).send("El numero pagina debe ser mayor a cero 0");
  }

  if (event_id.length > 23) {
    const event: any = await Event.findOne({
      _id: event_id,
    });

    if (!event) {
      return res.status(404).send("No se encontro el evento");
    }

    return res.status(200).json({
      ...event._doc,
      isFav: favEvents.some((favEvent) => favEvent.event_id === event_id),
    });
  }

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
    title: { $regex: query, $options: "i" },
    _id: { $in: favEvents.map((favEvent) => favEvent.event_id) },
  })
    .limit(size)
    .skip(size * (page - 1))
    .sort({ createdAt: -1 })
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
