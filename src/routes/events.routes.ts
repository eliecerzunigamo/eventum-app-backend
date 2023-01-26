import express from "express";
import { eventGetAllController } from "../controllers/events.getAll.controller";
import { eventGetAllMiddleware } from "../middlewares/event.getAll.middleware";

const app = express();

app.get("/all", eventGetAllMiddleware, eventGetAllController);

export default app;
