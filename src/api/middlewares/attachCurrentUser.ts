import { NextFunction, Request, Response } from "express";
import Models from "../../models";
import { APIResponse } from "../../utils";
import { IRequest } from "../../interfaces/IRequest";

export const attachCurrentUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user.userId;
    req.currentUser = await Models.user.findOne({ where: { UserId: user } });
    next();
  } catch (error) {
    return APIResponse.unAuthorized(res, "Unauthorized", {});
  }
};
