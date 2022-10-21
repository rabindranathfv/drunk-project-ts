import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET_SEED } from '../config/config';
import { Token } from './../interfaces/token.interface';

export const validateSesion = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'no token available',
    });
  }

  try {
    const tokenVerify = verify(token, JWT_SECRET_SEED ?? 'development-seed') as Token;
    res.locals.id = tokenVerify.id;
    res.locals.name = tokenVerify.name;
    res.locals.expiresIn = tokenVerify.exp;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      message: 'User with invalid token',
    });
  }
};
