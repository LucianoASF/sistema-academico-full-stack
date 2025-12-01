import type { Request, Response } from 'express';
import { MatriculaCursoService } from '../services/matriculaCurso.service.js';

export class MatriculaCursoController {
  static async create(req: Request, res: Response) {
    console.log(req.body);
    res.status(201).json(await new MatriculaCursoService().create(req.body));
  }
  static async getAllByAluno(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new MatriculaCursoService().getAllByAluno(
          Number(req.params.alunoId),
        ),
      );
  }
  static async getAll(req: Request, res: Response) {
    res.status(200).json(await new MatriculaCursoService().getAll());
  }
  static async getById(req: Request, res: Response) {
    res
      .status(200)
      .json(await new MatriculaCursoService().getById(Number(req.params.id)));
  }
  static async delete(req: Request, res: Response) {
    await new MatriculaCursoService().delete(Number(req.params.id));
    res.status(204).end();
  }
  static async update(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new MatriculaCursoService().update(
          Number(req.params.id),
          req.body,
        ),
      );
  }
}
