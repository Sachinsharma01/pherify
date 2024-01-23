import express, { NextFunction, Request, Response, Router } from "express";
import { logger } from "../utils";
import initializeRoutes from "./routes";

export default () => {
  const app: Router = express.Router();

    app.use(initializeRoutes());  // initialize routes
    logger.info("Routes initialized ✌️ ✌️ ");

  app.get("/health", (req: Request, res: Response, next: NextFunction) => {
    logger.debug("Health check API hit");
    return res.send("I am active and listening 👍👍");
  });

  return app;
};
