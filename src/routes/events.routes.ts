import express from "express";
import { eventGetAllController } from "../controllers/events.getAll.controller";

const app = express();

app.get(
  "/all",
  (_, __, next) => {
    next();
  },
  eventGetAllController
);

export default app;
