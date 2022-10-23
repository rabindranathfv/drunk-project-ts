import { NextFunction, Request, Response } from 'express';
import rTracer from 'cls-rtracer';
import { stringify } from 'flatted';

import { User } from '../interfaces/user.interface';
import UserService from './../service/user.service';
import AuditModel from '../models/audit.models';

class UserController {
  public userService = new UserService();
  public audit = AuditModel;

  constructor() {}

  public async saveAudits(req: Request, res: Response) {
    try {
      const requestId = rTracer.id();
      const transformReq = stringify(req);
      const transformRes = stringify(res);
      await this.audit.create({ requestId, req: transformReq, res: transformRes });
    } catch (error) {
      console.log(error);
      throw new Error('there is some troubles saving audits');
    }
  }

  public createUserCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const createUserData = await this.userService.createUser(userData);

      res.status(201).json({ ok: true, data: createUserData, message: `user ${userData.email} has been created` });
    } catch (error) {
      next(error);
    } finally {
      await this.saveAudits(req, res);
    }
  };

  public getUsersCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser(req.query);

      res.status(200).json({ ok: true, data: findAllUsersData, message: 'findAll all Users successfully' });
    } catch (error) {
      next(error);
    } finally {
      await this.saveAudits(req, res);
    }
  };

  public getUserByIdCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ ok: true, data: findOneUserData, message: `getUserById succesfully ` });
    } catch (error) {
      next(error);
    } finally {
      await this.saveAudits(req, res);
    }
  };

  public updateUserCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ ok: true, data: updateUserData, message: `updatedUser successfully` });
    } catch (error) {
      next(error);
    } finally {
      await this.saveAudits(req, res);
    }
  };

  public deleteUserCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ ok: true, data: deleteUserData, message: 'deleted user successfully' });
    } catch (error) {
      next(error);
    } finally {
      await this.saveAudits(req, res);
    }
  };
}

export default UserController;
