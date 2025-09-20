import type { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../errors/forbidden.error.js';

export const AuthorizationMiddleware = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role))
      return next(new ForbiddenError());
    next();
  };
};
