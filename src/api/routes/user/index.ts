import { celebrate } from "celebrate";
import { Router } from "express";
import middlewares from "../../middlewares";
import validations from "./validations";
import UserController from "./user.controller";
import { attachCurrentUser } from "../../middlewares/attachCurrentUser";

const route: Router = Router();
export default (app: Router) => {
  app.use("/user", route);

  /**
   * @swagger
   *  securityDefinitions:
   *    Bearer:
   *      type: apiKey
   *      name: Authorization
   *      in: headers
   * /api/user/markSpam:
   *   put:
   *     tags:
   *       - Contact
   *     summary: Used to mark contact as spam
   *     description: Used mark contact as spam
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: body to mark as spam user.
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *              isSpam:
   *                type: boolean
   *                description: whether to mark as spam or not
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
  route.put(
    "/markSpam",
    celebrate({
      body: validations.markSpam,
    }),
    middlewares.verifyAuth,
    UserController.markUserSpam
  );

  /**
   * @swagger
   *  securityDefinitions:
   *    Bearer:
   *      type: apiKey
   *      name: Authorization
   *      in: header
   * /api/user/list:
   *   get:
   *     tags:
   *       - Contact
   *     summary: list and search a contact
   *     description: list and search a contact
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *         description: name to search and list users.
   *         in: query
   *         required: false
   *       - name: phone
   *         description: name to search and list users.
   *         in: query
   *         required: false
   * 
   *     responses:
   *       200:
   *         description: producecs a success response
   *       500:
   *         description: producecs a success response
   *       400:
   *         description: producecs a success response
   */
  route.get(
    '/list',
    celebrate({
      query: validations.listUsers,
    }),
    middlewares.verifyAuth,
    attachCurrentUser,
    UserController.listUsers
  )
};
