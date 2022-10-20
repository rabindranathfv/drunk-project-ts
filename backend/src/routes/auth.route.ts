import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { Routes } from '../interfaces/route.interface';

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: users Name
 *        email:
 *          type: string
 *          description: user's email
 *        password:
 *          type: array
 *          description: user's password
 *      required:
 *        - email
 *        - password
 *      example:
 *        name: rabindranath
 *        email: user1@gmail.com
 *        password: 123456
 *  parameters:
 *    name:
 *      in: body
 *      name: name
 *      description: user's name
 *      required: false
 *    email:
 *      in: body
 *      name: email
 *      description: users's email
 *      required: true
 *    password:
 *      in: body
 *      name: password
 *      description: user's password
 *      required: true
 */

/**
 * @swagger
 *  tags:
 *    name: User
 *    description: User & Authentication endpoints
 */

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /api/v1/auth/login:
     *  post:
     *    summary: user's login endpoint
     *    tags: [User]
     *    requestBody:
     *      required: true
     *    parameters:
     *      - in: formData
     *        name: email
     *        type: string
     *        description: user's email
     *        required: true
     *      - in: formData
     *        name: password
     *        type: string
     *        description: user's password
     *        required: true
     *    responses:
     *      200:
     *        description: user's login endpoint to receive authentication token
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                ok:
     *                  type: boolean
     *                  description: explain if the responses goings well or not
     *                message:
     *                  type: boolean
     *                  description: explain message if register process was sucess or not
     *                user:
     *                  type: object
     *                  description: users information
     *                token:
     *                  type: string
     *                  description: user's session token
     *      400:
     *         description: bad request, there is some errors on request body
     *         content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                ok:
     *                  type: boolean
     *                  description: explain if the responses goings well or not
     *                message:
     *                  type: string
     *                  description: explain message of with field is missing or have some error
     *      500:
     *        description: server side error
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                ok:
     *                  type: boolean
     *                  description: explain if the responses goings well or not
     *                message:
     *                  type: string
     *                  description: msg from the endpoint used
     */
    this.router.post(`${this.path}/login`, this.authController.logInCtrl);

    /**
     * @swagger
     * /api/v1/auth/renew:
     *  get:
     *    summary: renew or renoval user's token
     *    tags: [User]
     *    parameters:
     *     - in: header
     *       name: x-auth
     *       description: user's token session
     *       type: string
     *       required: true
     *    responses:
     *      200:
     *        description: renew or renoval user's token
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                ok:
     *                  type: boolean
     *                  description: explain if the responses goings well or not
     *                message:
     *                  type: string
     *                  description: explain message if register process was sucess or not
     *                user:
     *                  type: object
     *                  description: users information
     *                  $ref: '#/components/schemas/User'
     *                token:
     *                  type: string
     *                  description: user's session token
     */
    this.router.post(`${this.path}/renew`, this.authController.renewTokenCtrl);
  }
}

export default AuthRoute;
