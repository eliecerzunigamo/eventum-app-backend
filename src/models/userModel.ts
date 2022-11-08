import mongoose from "mongoose";
import { Roles } from "../utils/enums";

export interface UserSchema {
  _doc: {
    email: string;
    password: string;
    name: string;
    user_type: Roles;
    fac: string;
    program: string;
  };
}

export const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  user_type: String,
  fac: String,
  program: String,
});

export const User = mongoose.model("User", userSchema, "users");
