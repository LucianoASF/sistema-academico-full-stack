import type { Express } from 'express';
import { usuarioRoutes } from './usuarios.route.js';

export const routes = (app: Express) => {
  app.use(usuarioRoutes);
};
