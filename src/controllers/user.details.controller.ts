import { Request, Response, NextFunction } from "express";

export const userDetailsController = (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    ...req.user,
  });
  next();
};
