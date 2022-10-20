import jwt from 'jsonwebtoken';
import { JWT_SECRET_SEED } from '../config/config';
import { logger } from '../utils/logger';

export const generateJWT = (id: string, name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const payload = { id, name };
    jwt.sign(payload, JWT_SECRET_SEED ?? 'dev-seed', { expiresIn: '8h' }, (err, token) => {
      if (err) {
        logger.error(err);
        reject('can not generate jwt token');
      }
      resolve(token);
    });
  });
};
