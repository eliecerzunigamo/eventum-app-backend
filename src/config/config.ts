import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  db: process.env.DB,
  secret: process.env.SECRET,
  saltRounds: process.env.SALT,
  jwt: process.env.JWT,
};
