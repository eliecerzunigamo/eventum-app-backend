import express from "express";
import { userLoginMiddleware } from "../middlewares/user.login.middleware";
import { userLoginController } from "../controllers/users.login.controller";
import auth from "../middlewares/auth";

const app = express();

app.post("/login", userLoginMiddleware, userLoginController);

export default app;
