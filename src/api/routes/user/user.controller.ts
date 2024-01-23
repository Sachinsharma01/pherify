import { NextFunction, Request, Response } from "express";
import { APIResponse, logger } from "../../../utils";
import UserService from "../../../services/user";
import { IUser } from "../../../interfaces/IUser";
import { IRequest } from "../../../interfaces/IRequest";

class UserController {
  async markUserSpam(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Marking user spam endpoint with body %o", req.body);
      const user = await UserService.markUserSpam(
        req.body.phone,
        req.body.isSpam
      );
      return APIResponse.success(res, "User marked as spam successfully", user);
    } catch (error: any) {
      logger.error("Error marking user spam", error);
      return APIResponse.badRequest(res, error.message, {});
    }
  }

  async listUsers(req: IRequest, res: Response, next: NextFunction) {
    try {
      logger.info("Listing users endpoint with query %o", req.query);
      const query: { name?: string; phone?: string } = req.query;
      const users: Array<IUser> = await UserService.listContacts(
        query,
        req.currentUser as IUser
      );
      return APIResponse.success(res, "User listed successfully", users);
    } catch (error: any) {
      logger.error("Error listing users", error);
      return APIResponse.badRequest(res, error.message, {});
    }
  }
}

export default new UserController();
