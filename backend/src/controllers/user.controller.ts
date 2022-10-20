import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/user.interface';
// import { User } from '../interfaces/user.interface';
// import { UserWithAuth } from '../types/types';
import UserService from './../service/user.service';

class UserController {
  public userService = new UserService();

  constructor() {}

  public createUserCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const createUserData = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: `user ${userData.email} has been created` });
    } catch (error) {
      next(error);
    }
  };

  public getUsersCtrl = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll all Users successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getUserByIdCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: `getUserById succesfully ` });
    } catch (error) {
      next(error);
    }
  };

  public updateUserCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: `updatedUser successfully` });
    } catch (error) {
      next(error);
    }
  };

  public deleteUserCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
