import { Request, Response } from 'express';

export interface Audit {
  requestId: string;
  req: Request;
  res: Response;
  createdAt: Date;
  UpdatedAt: Date;
}
