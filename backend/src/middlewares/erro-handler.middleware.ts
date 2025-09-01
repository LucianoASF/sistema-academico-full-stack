import { errors } from 'celebrate';
import type { Express, NextFunction, Request, Response } from 'express';
import { ErrorBase } from '../errors/base.error.js';
import { InternalServerError } from '../errors/internal-server.error.js';

export const erroHandler = (app: Express) => {
  app.use(errors());
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ErrorBase) {
      error.send(res);
    } else {
      console.log(error);
      new InternalServerError().send(res);
    }
  });
};
