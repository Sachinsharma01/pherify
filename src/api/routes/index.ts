import express, { Router } from "express";
import auth from "./auth";
import user from "./user";

function initializeRoutes() {
  const app: Router = express.Router();

  auth(app);
  user(app);

  return app;
}

export default initializeRoutes;
