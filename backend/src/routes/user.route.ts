import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import UserController from '../controllers/user.controller';

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
 *    description: User & Authenticated endpoints
 */

class UserRoute implements Routes {
  public path = `/user`;
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /api/v1/user:
     *  post:
     *    summary: registerUser
     *    tags: [User]
     *    responses:
     *      200:
     *        description: create new user
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
     *                  $ref: '#/components/schemas/User'
     */
    this.router.post(`${this.path}`, this.userController.createUserCtrl);

    this.router.get(`${this.path}`, this.userController.getUsersCtrl);

    this.router.get(`${this.path}/:id`, this.userController.getUserByIdCtrl);

    this.router.put(`${this.path}/:id`, this.userController.updateUserCtrl);

    this.router.delete(`${this.path}/:id`, this.userController.deleteUserCtrl);
  }
}

export default UserRoute;
