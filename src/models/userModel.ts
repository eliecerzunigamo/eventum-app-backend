import mongoose from "mongoose";
import { UserType } from "../middlewares/user.register.middleware";

export interface UserSchema {
  _doc: {
    name: string;
    email: string;
    user_type: UserType;
    password: string;
    phone: number;
    age: number;
  };
}

export const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  user_type: String,
  phone: String,
  age: String,
});

export const User = mongoose.model("User", userSchema, "users");
