import { NextFunction, Request, Response } from 'express';
import UserService from './../service/user.service';

class UserController {
  public userService = new UserService();

  constructor() {}

  public registerUserCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.registerUser(req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  public loginUserCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.loginUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  public renewUserTokenCtrl = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.renewUserToken();
      res.status(201).json(user);
    } catch (error) {
      next(error);
      console.log(error);
    }
  };
}

export default UserController;
