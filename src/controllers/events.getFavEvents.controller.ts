import { NextFunction, Request, Response } from "express";
import { Event, Faculty } from "../models";
import { FavEvent } from "../models/favEventModel";

export const getFavEventsController = async (
  req: Request<{}, {}, {}, {
    size?: 20;
    page?: 1;
    faculty_id?: string;
    program_id?: string;
    event_id?: string;
    query?: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user.user;
  const { size = 20, page = 1, faculty_id, program_id, query="", event_id=""} = req.query;

  const favEvents = await FavEvent.find({ user_id: _id });


  if (page < 1) { return res.status(400).send("El numero pagina debe ser mayor a cero 0"); };
  
  
  if (event_id.length > 23) {
    
    const event : any = await Event.findOne({
      _id: event_id,
    });

    if (!event) {
      return res.status(404).send("No se encontro el evento");
    }
    

    return res.status(200).json({...event._doc, isFav: favEvents.some((favEvent) => favEvent.event_id === event_id)});

  }

  if (!faculty_id && !program_id) {

    Event.find({
      title: { $regex: query , $options: 'i'},
      _id: { $in: favEvents.map((favEvent) => favEvent.event_id) },
    })
      .limit(size)
      .skip(size * (page - 1))
      .then((events) => {
        return res.status(200).json(events);
      });

  }

  if (faculty_id && !program_id) {
    const faculties = await Faculty.find({});
    const faculty = faculties.find((faculty: any) => faculty._id == faculty_id);

    if (!faculty) {
      return res.status(400).json({ message: "Esta facultad no existe" });
    }

    Event.find(
      {
        fac: faculty.name,
        title: { $regex: query , $options: 'i'},
        _id: { $in: favEvents.map((favEvent) => favEvent.event_id) },
      }).limit(size)
      .skip(size * (page - 1))
      .then((events) => {
        return res.status(200).json(events);
      });

  }

  if (faculty_id && program_id) {

    const faculties = await Faculty.find({});
    const faculty = faculties.find((faculty: any) => faculty._id == faculty_id);

    if (!faculty) {
      return res.status(400).json({ message: "Esta facultad no existe" });
    }

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
        title: { $regex: query , $options: 'i'},
        _id: { $in: favEvents.map((favEvent) => favEvent.event_id) },
      }).limit(size)
      .skip(size * (page - 1))
      .then((events) => {
        return res.status(200).json(events);
      });
  }

};
