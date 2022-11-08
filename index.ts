import express from "express";
import { config } from "./src/config";
import { connect } from "./src/db";
import cors from "cors";
import publicRoutes from "./src/routes/publicRoutes";
import privateRoutes from "./src/routes/privateRoutes";
import auth from "./src/middlewares/auth";
import path from "path";

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
app.use(express.static(path.join(__dirname, 'uploads')));
app.set('uploads', path.join(__dirname, 'uploads'))

app.use("/api", publicRoutes);
app.use("/api", auth, privateRoutes);

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
