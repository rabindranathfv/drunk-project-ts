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
      const user = await this.authService.renewToken();
      res.status(201).json(user);
    } catch (error) {
      next(error);
      console.log(error);
    }
  };
}

export default AuthController;
