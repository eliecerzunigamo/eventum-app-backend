import mongoose from "mongoose";
import { config } from "../config";

export const connect = async () => {
  try {
    await mongoose.connect(config.db!);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
