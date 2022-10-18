import { Request, Response, NextFunction } from 'express';
import { SchemaOf } from 'yup';

const validate = (schema: SchemaOf<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: `${err.message}` });
    }
  }
};

export default validate;
