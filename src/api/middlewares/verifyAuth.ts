import jwt from "jsonwebtoken";
import config from "../../config";
import { NextFunction, Request, Response } from "express";
import { APIResponse } from "../../utils";
import { IRequest } from "../../interfaces/IRequest";

export const verifyAuth = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const token = getTokenFromHeader(req as IRequest);
  if (!token) {
    return APIResponse.unAuthorized(res, "Unauthorized", {});
  }
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return APIResponse.unAuthorized(res, "Unauthorized", {});
    }
    req.user = decoded;
    next();
  });
};

const getTokenFromHeader = (req: IRequest) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};
