import express from "express";
import { userDetailsController } from "../controllers/user.details.controller";
const app = express();

app.get(
  "/details",
  (_, __, next) => {
    next();
  },
  userDetailsController
);

export default app;
