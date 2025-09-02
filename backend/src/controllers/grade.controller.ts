import type { Request, Response } from 'express';
import { GradeService } from '../services/grade.service.js';

export class GradeController {
  static async create(req: Request, res: Response) {
    res
      .status(201)
      .json(await new GradeService().create(Number(req.params.cursoId)));
  }

  static async getById(req: Request, res: Response) {
    res
      .status(200)
      .json(await new GradeService().getById(Number(req.params.id)));
  }
  static async delete(req: Request, res: Response) {
    await new GradeService().delete(Number(req.params.id));
    res.status(204).end();
  }
  static async getAllByCurso(req: Request, res: Response) {
    res
      .status(200)
      .json(await new GradeService().getAllByCurso(Number(req.params.cursoId)));
  }
}
