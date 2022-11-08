import express from "express";
import users from "./user.routes";
import events from "./events.routes";

const router = express.Router();

router.use("/users", users);
router.use("/events", events);

export default router;
