import type { Express } from 'express';
import { usuarioRoutes } from './usuarios.route.js';
import { cursoRoutes } from './cursos.route.js';

export const routes = (app: Express) => {
  app.use(usuarioRoutes);
  app.use(cursoRoutes);
};
