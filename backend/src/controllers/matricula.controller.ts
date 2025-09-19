import type { Request, Response } from 'express';
import { MatriculaService } from '../services/matricula.service.js';

export class MatriculaController {
  static async create(req: Request, res: Response) {
    res.status(201).json(await new MatriculaService().create(req.body));
  }
  static async getAllByDisciplinaRealizada(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new MatriculaService().getAllByDisciplinaRealizada(
          Number(req.params.disciplinaRealizadaId),
        ),
      );
  }
  static async getMatriculasCursandoByAluno(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new MatriculaService().getMatriculasCursandoByAluno(
          Number(req.params.alunoId),
        ),
      );
  }
  static async getById(req: Request, res: Response) {
    res
      .status(200)
      .json(await new MatriculaService().getById(Number(req.params.id)));
  }
  static async delete(req: Request, res: Response) {
    await new MatriculaService().delete(Number(req.params.id));
    res.status(204).end();
  }
  static async update(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new MatriculaService().update(Number(req.params.id), req.body),
      );
  }
}
