import type { Request, Response } from 'express';
import { DisciplinaService } from '../services/disciplina.service.js';

export class DisciplinaController {
  static async create(req: Request, res: Response) {
    res.status(201).json(await new DisciplinaService().create(req.body));
  }
  static async getAll(req: Request, res: Response) {
    res.status(200).json(await new DisciplinaService().getAll());
  }
  static async getById(req: Request, res: Response) {
    res
      .status(200)
      .json(await new DisciplinaService().getById(Number(req.params.id)));
  }
  static async delete(req: Request, res: Response) {
    await new DisciplinaService().delete(Number(req.params.id));
    res.status(204).end();
  }
  static async conectarDisciplinaComGrade(req: Request, res: Response) {
    await new DisciplinaService().conectarDisciplinaComGrade(
      Number(req.params.id),
      Number(req.body.gradeId),
    );
    res.status(204).end();
  }
  static async desconectarDisciplinaComGrade(req: Request, res: Response) {
    await new DisciplinaService().desconectarDisciplinaComGrade(
      Number(req.params.id),
      Number(req.params.gradeId),
    );
    res.status(204).end();
  }
}
