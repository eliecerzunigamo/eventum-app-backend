import express from "express";
import { config } from "./config";
import { connect } from "./db";
import cors from "cors";
import publicRoutes from "./routes/publicRoutes";
import privateRoutes from "./routes/privateRoutes";
import auth from "./middlewares/auth";
import { User } from './models/userModel';
import { Roles } from './utils/enums';
import { encrypt } from './utils/encrypt';

const app = express();

connect();
app.set("jwt", config.jwt);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", publicRoutes);
app.use("/api", auth, privateRoutes);

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
