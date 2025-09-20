// import { PrismaClient } from '@prisma/client';
// import type { Request, Response, NextFunction } from 'express';

// const prisma = new PrismaClient();

// interface OwnershipCheckOptions {
//   model: keyof typeof prisma;
//   resourceIdParam: string; // nome do param da rota, ex: 'id'
//   userIdFieldPath: string[]; // caminho até o userId
// }

// export const checkOwnership = (options: OwnershipCheckOptions) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const resourceId = Number(req.params[options.resourceIdParam]);
//     const userId = req.user.id; // assumindo que o user está no req (ex: via middleware de auth)

//     try {
//       const resource = await (prisma[options.model] as any).findFirst({
//         where: buildWhereClause(options.userIdFieldPath, resourceId, userId),
//       });

//       if (!resource) {
//         return res.status(403).json({ message: 'Acesso negado' });
//       }

//       next();
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Erro interno' });
//     }
//   };
// };

// // Função recursiva para construir o "where" aninhado
// function buildWhereClause(
//   path: string[],
//   resourceId: number,
//   userId: number,
// ): any {
//   if (path.length === 1) {
//     return {
//       id: resourceId,
//       [path[0]]: userId,
//     };
//   }

//   const [current, ...rest] = path;
//   return {
//     id: resourceId,
//     [current]: buildWhereClause(rest, -1, userId), // o id -1 é ignorado no prisma
//   };
// }
