import { NextFunction, Request, Response } from 'express';
// import { User } from '../interfaces/user.interface';
// import { UserWithAuth } from '../types/types';
import UserService from './../service/user.service';

class UserController {
  public userService = new UserService();

  constructor() {}

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const createUserData = await this.userService.createUser(userData);

      res.status(201).json({ user: createUserData, message: `user ${userData.email} has been created` });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
