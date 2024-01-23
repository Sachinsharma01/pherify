import express, { NextFunction, Request, Response } from "express";
import * as swaggerUi from "swagger-ui-express";
import { logger } from "./utils";
import config from "./config";
import ExpressLoader from "./loaders/express";
import specs from "./swagger";
import loadApi from "./api";
import db from "./models";
import { errors, isCelebrateError } from "celebrate";
import middlewares from "./api/middlewares";

async function startServer() {
  const app: express.Application = express();

  //syncing database
  db.sequelize.sync();
  logger.info("✌️ DB loaded and connected!");
  
  app.use(middlewares.rateLimitRequests);
  ExpressLoader({ app });
  app.use("/api", loadApi());

  //! handling validations errors
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (isCelebrateError(err)) {
      console.error(err.details.get("body")?.message);
      return res.status(400).json({ error: err.details.get("body")?.message });
    }
    return next(err);
  });

  app.use(errors());

  // loading swagger doc
  app.use("/api" + "/api-docs/", swaggerUi.serve, swaggerUi.setup(specs));
  app.listen(config.port, () => {
    logger
      .info(
        `
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `
      )
      .on("error", (err) => {
        logger.error(err);
        process.exit(1);
      });
  });
  return app;
}

startServer();
