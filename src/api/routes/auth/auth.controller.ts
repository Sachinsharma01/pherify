import { NextFunction, Request, Response } from "express";
import { APIResponse, logger } from "../../../utils";
import AuthService from "../../../services/auth";
import { IUserDTO } from "../../../interfaces/IUser";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Registering user endpoint with body %o", req.body);
      const user = await AuthService.register(req.body as IUserDTO);
      return APIResponse.success(res, "User registered successfully", user);
    } catch (error: any) {
      logger.error("Error registering user", error);
      return APIResponse.badRequest(res, error.message, {});
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Logging in user endpoint with body %o", req.body);
      const user = await AuthService.login(req.body as IUserDTO);
      return APIResponse.success(res, "User logged in successfully", user);
    } catch (error: any) {
      logger.error("Error logging in user", error);
      return APIResponse.badRequest(res, error.message, {});
    }
  }
}

export default new AuthController();
