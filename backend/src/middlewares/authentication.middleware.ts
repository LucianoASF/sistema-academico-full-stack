import type { Usuario } from '@prisma/client';
import type { Express, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/unauthorized.error.js';
import { ErrorBase } from '../errors/base.error.js';
import { InternalServerError } from '../errors/internal-server.error.js';

export function AuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.method === 'POST' && req.url.startsWith('/auth/login')) return next();

  const token = req.cookies.token;

  if (!token) {
    return next(new UnauthorizedError('Não autenticado'));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET!) as Pick<
      Usuario,
      'id' | 'role'
    >;
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    if (error instanceof ErrorBase)
      return next(new UnauthorizedError('Token inválido ou expirado'));
    next(new InternalServerError());
  }
}
