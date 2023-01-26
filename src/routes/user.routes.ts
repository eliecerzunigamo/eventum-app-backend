import express from "express";
import { userLoginMiddleware } from "../middlewares/user.login.middleware";
import { userLoginController } from "../controllers/users.login.controller";
import { userRegisterMiddleware } from "../middlewares/user.register.middleware";
import { userRegisterController } from "../controllers/user.userRegisterController";

const app = express();

app.post("/login", userLoginMiddleware, userLoginController);

app.post("/register", userRegisterMiddleware, userRegisterController);

export default app;
