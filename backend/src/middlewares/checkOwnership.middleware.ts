import type { Request, Response, NextFunction } from 'express'; // ajuste o caminho do client
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../errors/not-found.error.js';
import { ForbiddenError } from '../errors/forbidden.error.js';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error.js';
import { InternalServerError } from '../errors/internal-server.error.js';

/**
 * Middleware genérico para verificar se o usuário é dono do recurso.
 *
 * @param model Nome do model do Prisma (ex: "aula", "disciplinaRealizada")
 * @param resourceIdParam Nome do param da rota com o id do recurso (ex: "id")
 * @param ownerPath Caminho do campo que indica o dono (ex: "professorId" ou "disciplinaRealizada.professorId")
 * @param userIdParam (opcional) Nome do param da rota que já traz o id do usuário dono (ex: "professorId")
 */
const prisma = new PrismaClient();
export function checkOwnershipMiddleware(
  model?: keyof typeof prisma,
  resourceIdParam?: string,
  ownerPath?: string,
  userIdParam?: string,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user; // assumindo que já tem req.user via JWT
      if (!user) {
        return res.status(401).json({ error: 'Não autenticado' });
      }

      // Se for admin, passa direto
      if (user.role === 'administrador') {
        return next();
      }
      if (userIdParam) {
        const routeUserId = Number(req.params[userIdParam]);
        if (isNaN(routeUserId)) {
          return next(new UnprocessableEntityError('ID inválido'));
        }

        if (routeUserId !== user.id) {
          return next(new ForbiddenError());
        }

        return next();
      }

      if (model && resourceIdParam && ownerPath) {
        const resourceId = Number(req.params[resourceIdParam]);
        if (isNaN(resourceId)) {
          return next(new UnprocessableEntityError('ID inválido'));
        }

        // monta select dinamicamente
        const select: any = {};
        buildSelect(select, ownerPath.split('.'));

        const resource: any = await (prisma as any)[model].findUnique({
          where: { id: resourceId },
          select,
        });

        if (!resource) {
          return next(new NotFoundError('Recurso não encontrado'));
        }

        const ownerId = getNestedValue(resource, ownerPath.split('.'));
        if (ownerId !== user.id) {
          return next(new ForbiddenError());
        }

        return next();
      }

      return next(new InternalServerError());
    } catch (error) {
      console.error(error);
      return next(new InternalServerError());
    }
  };
}

/**
 * Monta o objeto `select` do Prisma de forma recursiva
 */
function buildSelect(obj: any, path: string[]) {
  const [key, ...rest] = path;

  if (!key) return; // segurança extra

  if (rest.length === 0) {
    obj[key] = true;
  } else {
    obj[key] = { select: {} };
    buildSelect(obj[key].select, rest);
  }
}

/**
 * Navega no objeto retornado pelo Prisma para extrair o valor final
 */
function getNestedValue(obj: any, path: string[]): any {
  return path.reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}
