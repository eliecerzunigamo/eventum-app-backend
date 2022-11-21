import express from "express";
import { eventCreateController } from "../controllers/events.create.controller";
import { createEventMiddleware } from "../middlewares/event.create.middleware";
import { facultiesGetAllController } from "../controllers/events.faculties.controller";
import { addEventToFavoriteMiddleware } from "../middlewares/event.fav.middleware";
import { addEventToFavoriteController } from "../controllers/events.addFav.controller";
import { getFavEventsController } from "../controllers/events.getFavEvents.controller";
import { deleteFavEventMiddleware } from "../middlewares/event.deleteFavEvent.middleware";
import { deleteFavEventController } from "../controllers/events.deleteFavEvent.controller";

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

app.get(
  "/fav-events",
  (_, __, next) => {
    next();
  },
  getFavEventsController
);

app.delete("/fav-events", deleteFavEventMiddleware, deleteFavEventController);

export default app;
