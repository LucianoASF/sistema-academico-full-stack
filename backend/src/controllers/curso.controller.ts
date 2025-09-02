import type { Request, Response } from 'express';
import { CursoService } from '../services/curso.service.js';

export class CursoController {
  static async create(req: Request, res: Response) {
    res.status(201).json(await new CursoService().create(req.body));
  }
  static async getAll(req: Request, res: Response) {
    res.status(200).json(await new CursoService().getAll());
  }
  static async getById(req: Request, res: Response) {
    res
      .status(200)
      .json(await new CursoService().getById(Number(req.params.id)));
  }
  static async delete(req: Request, res: Response) {
    await new CursoService().delete(Number(req.params.id));
    res.status(204).end();
  }
  static async update(req: Request, res: Response) {
    res
      .status(200)
      .json(await new CursoService().update(Number(req.params.id), req.body));
  }
}
