import { NextFunction, Request, Response } from "express";
import { User as UserModel, UserSchema } from "../models";
import { emailValidate, passValidate } from "./user.login.middleware";

export type UserType =
  | "estudiante"
  | "director de programa"
  | "docente"
  | "profesional"
  | "otro";

export interface UserToRegister {
  name: string;
  email: string;
  password: string;
  phone: number;
  age: number;
  userType: UserType;
}

export const phoneValidate = (phone: string) => /^\d{10}$/.test(phone);
export const ageValidate = (age: string) => /^\d{1,3}$/.test(age);
export const nameValidate = (name: string) => /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,50}$/.test(name);

export const userRegisterMiddleware = async (
  req: Request<{}, {}, UserToRegister, {}>,
  res: Response,
  next: NextFunction
) => {
  const { email, password, age, name, phone, userType } = req.body;

  const userData = async () => {
    return await UserModel.find({
      email,
    });
  };

  const userExist = await userData();

  if (userExist.length > 0) {
    return res.status(400).send({ message: "El usuario ya existe" });
  }

  if (!email || !password || !age || !name || !phone || !userType) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese todos los campos" });
  }

  if (!emailValidate(email)) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese un email válido" });
  }

  if (!passValidate(password)) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese una contraseña válida" });
  }

  if (!phoneValidate(phone.toString())) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese un número de teléfono válido" });
  }

  if (!ageValidate(age.toString())) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese una edad válida" });
  }

  if (!nameValidate(name)) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese un nombre válido" });
  }

  if (!userType) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese un tipo de usuario válido" });
  }

  next();
};
