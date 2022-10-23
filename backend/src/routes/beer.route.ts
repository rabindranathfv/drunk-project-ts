import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import { validateSesion } from '../middleware/validateSession.middleware';
import BeerController from './../controllers/beer.controller';

// TODO: Update swagger definitions for beer endpoints
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
 *    name: Beer
 *    description: Beer Endpoints
 */

class BeerRoute implements Routes {
  public path = `/beer`;
  public router = Router();
  public beerController = new BeerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // TODO: FIX THIS DOC BASED ON BEER
    /**
     * @swagger
     * /api/v1/beer:
     *  post:
     *    summary: create User
     *    tags: [Beer]
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
    this.router.post(`${this.path}`, this.beerController.loadBeersCtrl);

    // TODO: Add DOC
    this.router.get(`${this.path}/search/:text`, validateSesion, this.beerController.getBeersBySearchCtrl);

    // TODO: Add DOC
    this.router.get(`${this.path}/ingridients`, validateSesion, this.beerController.getBeersTopIngridientsCtrl);

    // TODO: Add DOC
    this.router.get(`${this.path}/filter`, validateSesion, this.beerController.getBeerFilterByNameOrIngridientsCtrl);

    // TODO: FIX THIS DOC BASED ON BEER
    /**
     * @swagger
     * /api/v1/beer/:
     *  get:
     *    summary: getAll Beers
     *    tags: [Beer]
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
    this.router.get(`${this.path}`, validateSesion , this.beerController.getAllBeersCtrl);

    // TODO: Add DOC
    this.router.get(`${this.path}/:id`, validateSesion , this.beerController.getBeerByIdCtrl);
  }
}

export default BeerRoute;
