import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET_SEED } from '../config/config';

export const validateSession = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth');
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'no token available',
    });
  }

  try {
    // const { uid, name, exp } = jwt.verify(token, JWT_SECRET_SEED || 'development-seed');
    // req.uid = uid;
    // req.name = name;
    // req.expiresIn = exp;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      message: 'invalid token',
    });
  }
};
