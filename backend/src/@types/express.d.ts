import type { Usuario } from '@prisma/client';

declare global {
  namespace Express {
    export interface Request {
      user: Pick<Usuario, 'id' | 'role'>;
    }
  }
}
