import { NextFunction, Request, Response } from 'express';
import rTracer from 'cls-rtracer';
import { stringify } from 'flatted';

import AuditModel from '../models/audit.models';
import AuthService from '../service/auth.service';

class AuthController {
  public authService = new AuthService();
  public audit = AuditModel;

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

  public logInCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const { findUser, token } = await this.authService.logIn(userData);

      res.status(200).json({ ok: true, data: findUser, token, message: `login succesfully` });
    } catch (error) {
      next(error);
    } finally {
      await this.saveAudits(req, res);
    }
  };

  public renewTokenCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, name } = res.locals;
      const token = await this.authService.renewToken(id, name);
      res.status(201).json({ ok: true, message: `renoval token succesfully`, token });
    } catch (error) {
      next(error);
      console.log(error);
    } finally {
      await this.saveAudits(req, res);
    }
  };
}

export default AuthController;
