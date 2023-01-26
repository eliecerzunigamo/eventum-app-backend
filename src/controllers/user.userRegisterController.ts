import { NextFunction, Request, Response } from "express";
import { User as UserModel, UserSchema } from "../models";
import { UserToRegister } from "../middlewares/user.register.middleware";
import { encrypt } from "../utils/encrypt";

export const userRegisterController = async (
  req: Request<{}, {}, UserToRegister, {}>,
  res: Response,
  next: NextFunction
) => {
  const { age, email, name, password, phone, userType } = req.body;

  const passToSend = await encrypt(password);

  new UserModel({
    age,
    email,
    name,
    password: passToSend,
    phone,
    user_type: userType,
  })
    .save()
    .then((user: any) => {
      res.status(200).send({
        user: {
          ...user._doc,
          password: "*******",
        },
      });
    })
    .catch((err: unknown) => {
      res.status(400).send({ message: "Error al registrar el usuario", err });
    });
};
