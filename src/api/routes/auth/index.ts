import { celebrate } from "celebrate";
import { Router } from "express";
import validations from "./validations";
import AuthController from "./auth.controller";

const route: Router = Router();
export default (app: Router) => {
  app.use("/auth", route);

/**
   * @swagger
   *  securityDefinitions:
   *    Bearer:
   *      type: apiKey
   *      name: Authorization
   * /api/auth/register:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Used to register the user
   *     description: Used for creating an entry for the user
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: body to register user.
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *              name:
   *                type: string
   *                description: name of user
   *              email:
   *                type: string
   *                description: email of user
   *              password:
   *                type: string
   *                description: password of user
   *              phone:
   *                type: string
   *                description: phone number of user
   *   
   *           required:
   *             - name
   *             - password
   *             - phone
   *     responses:
   *       200:
   *         description: producecs a success response
   *       500:
   *         description: producecs a success response
   *       400:
   *         description: producecs a success response
   */
  route.post(
    "/register",
    celebrate({
      body: validations.register,
    }),
    AuthController.register
  );

  /**
   * @swagger
   *  securityDefinitions:
   *    Bearer:
   *      type: apiKey
   *      name: Authorization
   * /api/auth/login:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Used to login the user
   *     description: Used for logging in the user
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: body to logging in the user.
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *              password:
   *                type: string
   *                description: password of user
   *              phone:
   *                type: string
   *                description: phone number of user
   *   
   *           required:
   *             - password
   *             - phone
   *     responses:
   *       200:
   *         description: producecs a success response
   *       500:
   *         description: producecs a success response
   *       400:
   *         description: producecs a success response
   */
  route.post(
    "/login",
    celebrate({
      body: validations.login,
    }),
    AuthController.login
  );
};
