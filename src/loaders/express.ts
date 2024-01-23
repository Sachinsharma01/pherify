import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { errors } from "celebrate";
import cors from "cors";
export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(errors());

  app.enable("trust proxy");
  app.use(cors());

  // Transforms the raw string of req.body into json
  app.use(express.json());

  /// error handlers
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  // app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  //   res.status(err.status || 500);
  //   res.json({
  //     errors: {
  //       message: err.message,
  //     },
  //   });
  // });
};
