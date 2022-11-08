import { NextFunction, Request, Response } from "express";

export const emailValidate = (email: string) =>
  /^[a-zA-Z0-9.!#$%&'*/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
    email
  );

export const passValidate = (pass: string) => /^\S{8,}$/.test(pass);

export interface User {
  email: string;
  password: string;
}

export const userLoginMiddleware = (
  req: Request<{}, {}, User, {}>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!emailValidate(email) || !passValidate(password)) {
    return res
      .status(400)
      .send({ message: "Por favor ingrese un email y contraseña válidos" });
  }
  next();
};
