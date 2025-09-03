import type { Express } from 'express';
import { usuarioRoutes } from './usuarios.route.js';
import { cursoRoutes } from './cursos.route.js';
import { disciplinaRoutes } from './disciplinas.route.js';
import { gradeRoutes } from './grades.route.js';
import { disciplinaRealizadaRoutes } from './disciplinasRealizadas.route.js';
import { aulaRoutes } from './aulas.route.js';

export const routes = (app: Express) => {
  app.use(usuarioRoutes);
  app.use(cursoRoutes);
  app.use(disciplinaRoutes);
  app.use(gradeRoutes);
  app.use(disciplinaRealizadaRoutes);
  app.use(aulaRoutes);
};
