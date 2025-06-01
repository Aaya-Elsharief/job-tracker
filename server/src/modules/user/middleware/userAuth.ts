import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../../utils/errors/http.error';
import verifyToken from '../../../utils/jwt/verifyToken';

export const UserAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return next(new UnauthorizedError());
    }
    const verified = await verifyToken(token);
    // @ts-ignore or extend Request interface for user
    req.user = verified;
    next();
  } catch (err) {
    next(new UnauthorizedError());
  }
};