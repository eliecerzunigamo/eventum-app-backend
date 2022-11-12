import { NextFunction, Request, Response } from "express";
import { User } from "../middlewares/user.login.middleware";
import { User as UserModel, UserSchema } from "../models";
import { compare } from "../utils/compare";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const userLoginController = (
  req: Request<{}, {}, User, {}>,
  res: Response,
  next: NextFunction
) => {
  UserModel.findOne(
    { email: req.body.email },
    async (err: unknown, user: UserSchema) => {
      if (err) {
        res.status(500).send(err);
      } else if (!user) {
        res.status(400).json({
          message:"Usuario no encontrado"
        });
      } else if (!(await compare(req.body.password, user._doc.password))) {
        res.status(400).send({
          message:"El usuario y la contraseña no coinciden"
        });
      } else {
        const token = jwt.sign(
          {
            user: {
              ...user._doc,
              password: undefined,
            },
          },
          config.jwt!,
          {}
        );
        res.status(200).send({ token, user: {
          email: user._doc.email,
          name: user._doc.name,
          user_type: user._doc.user_type,
          
        } });
      }
    }
  );
};
