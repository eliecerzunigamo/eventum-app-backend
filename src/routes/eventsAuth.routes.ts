import express from "express";
import { eventCreateController } from "../controllers/events.create.controller";
import { createEventMiddleware } from "../middlewares/event.create.middleware";
import { facultiesGetAllController } from "../controllers/events.faculties.controller";
import { addEventToFavoriteMiddleware } from "../middlewares/event.fav.middleware";
import { addEventToFavoriteController } from "../controllers/events.addFav.controller";
import { getFavEventsController } from "../controllers/events.getFavEvents.controller";
import { deleteFavEventMiddleware } from "../middlewares/event.deleteFavEvent.middleware";
import { deleteFavEventController } from "../controllers/events.deleteFavEvent.controller";
import { addEventToScheduleMiddleware } from "../middlewares/event.schedule.middleware";
import { addEventToScheduleController } from "../controllers/event.addSchedule.controller";
import { getScheduleEventsController } from "../controllers/event.getScheduleEvents.controller";
import { deleteScheduleEventMiddleware } from "../middlewares/event.schedule.delete.middleware";
import { deleteScheduleEventController } from "../controllers/event.deleteSchedule.controller";
import { eventGetAllMiddleware } from "../middlewares/event.getAll.middleware";
import { deleteEventMiddleware } from '../middlewares/event.delete.middleware';
import { deleteEventController } from '../controllers/event.delete.controller';
import { eventGetAllController } from '../controllers/events.getAll.controller';

const app = express();

app.post("/create", createEventMiddleware, eventCreateController);

app.get(
  "/all-faculties",
  (_, __, next) => {
    next();
  },
  facultiesGetAllController
);

app.post(
  "/fav-events",
  addEventToFavoriteMiddleware,
  addEventToFavoriteController
);

app.post(
  "/schedule-events",
  addEventToScheduleMiddleware,
  addEventToScheduleController
);

app.get("/fav-events", eventGetAllMiddleware, getFavEventsController);

app.get("/schedule-events", eventGetAllMiddleware, getScheduleEventsController);

app.delete("/fav-events", deleteFavEventMiddleware, deleteFavEventController);

app.delete(
  "/schedule-events",
  deleteScheduleEventMiddleware,
  deleteScheduleEventController
);

app.delete("/event", deleteEventMiddleware, deleteEventController)

app.get("/all-auth", eventGetAllMiddleware, eventGetAllController);

export default app;
