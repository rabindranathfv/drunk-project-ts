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
 *        id:
 *          type: string
 *          description: id generated by Mongo
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
 *        id: 6351b9b24e42bfdb6eacf7b6
 *        name: rabindranath
 *        email: user1@gmail.com
 *        password: 123456
 *  parameters:
 *    id:
 *      in: body
 *      description: userId generate by Mongo
 *      name: id
 *      required: false,
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
 *    description: User Endpoints
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
     *    summary: create User
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
     *                  type: string
     *                  description: explain message if register process was sucess or not
     *                data:
     *                  type: object
     *                  description: users information
     *                  $ref: '#/components/schemas/User'
     */
    this.router.post(`${this.path}`, this.userController.createUserCtrl);

    /**
     * @swagger
     * /api/v1/user/:userId:
     *  get:
     *    summary: getAll Users
     *    tags: [User]
     *    parameters:
     *      - in: path
     *        description: userId generate by Mongo
     *        name: id
     *        type: string
     *        required: true
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
     *                  type: string
     *                  description: explain message if the process was sucess or not
     *                data:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/schemas/User'
     *                  description: users information
     */
    this.router.get(`${this.path}`, this.userController.getUsersCtrl);

    /**
     * @swagger
     * /api/v1/user/:userId:
     *  get:
     *    summary: get User byId
     *    tags: [User]
     *    parameters:
     *      - in: path
     *        description: userId generate by Mongo
     *        name: id
     *        type: string
     *        required: true
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
     *                  type: string
     *                  description: explain message if the process was sucess or not
     *                data:
     *                  type: object
     *                  $ref: '#/components/schemas/User'
     *                  description: users information
     */
    this.router.get(`${this.path}/:id`, this.userController.getUserByIdCtrl);

    /**
     * @swagger
     * /api/v1/user/:userId:
     *  put:
     *    summary: update User by Id
     *    tags: [User]
     *    parameters:
     *      - in: path
     *        description: userId generate by Mongo
     *        name: id
     *        type: string
     *        required: true
     *      - in: body
     *        name: name
     *        description: user's name
     *        required: false
     *      - in: body
     *        name: email
     *        description: users's email
     *        required: false
     *      - in: body
     *        name: password
     *        description: user's password
     *        required: false
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
     *                  type: string
     *                  description: explain message if the process was sucess or not
     *                data:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/schemas/User'
     *                  description: users information
     */
    this.router.put(`${this.path}/:id`, this.userController.updateUserCtrl);

    /**
     * @swagger
     * /api/v1/user/:userId:
     *  delete:
     *    summary: delete User
     *    tags: [User]
     *    parameters:
     *      - in: path
     *        description: userId generate by Mongo
     *        name: id
     *        type: string
     *        required: true
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
     *                  type: string
     *                  description: explain message if register process was sucess or not
     *                data:
     *                  type: object
     *                  description: users information
     *                  $ref: '#/components/schemas/User'
     */
    this.router.delete(`${this.path}/:id`, this.userController.deleteUserCtrl);
  }
}

export default UserRoute;
