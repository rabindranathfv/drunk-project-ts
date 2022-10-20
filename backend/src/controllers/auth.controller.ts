import { NextFunction, Request, Response } from 'express';
import AuthService from '../service/auth.service';

class AuthController {
  public authService = new AuthService();

  public logInCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const { findUser, token } = await this.authService.logIn(userData);

      res.status(200).json({ data: findUser, token, message: `login succesfully` });
    } catch (error) {
      next(error);
    }
  };

  public renewTokenCtrl = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, name } = res.locals;
      const token = await this.authService.renewToken(id, name);
      res.status(201).json({ ok: true, message: `renoval token succesfully`, token });
    } catch (error) {
      next(error);
      console.log(error);
    }
  };
}

export default AuthController;
