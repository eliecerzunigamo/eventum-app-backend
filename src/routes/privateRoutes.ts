import express from "express";
import eventsAuth from "./eventsAuth.routes";
import usersAuth from "./usersAuth.routes";

const router = express.Router();

router.use("/events", eventsAuth);
router.use("/users", usersAuth);

export default router;
