import type { Request, Response } from 'express';
import { DisciplinaRealizadaService } from '../services/disciplinaRealizada.service.js';

export class DisciplinaRealizadaController {
  static async create(req: Request, res: Response) {
    res
      .status(201)
      .json(await new DisciplinaRealizadaService().create(req.body));
  }
  static async getAll(req: Request, res: Response) {
    res.status(200).json(await new DisciplinaRealizadaService().getAll());
  }
  static async getById(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new DisciplinaRealizadaService().getById(Number(req.params.id)),
      );
  }
  static async getDisciplinasEmCusroByProfessor(req: Request, res: Response) {
    res.json(
      await new DisciplinaRealizadaService().getDisciplinasEmCusroByProfessor(
        Number(req.params.professorId),
        { id: req.user.id, role: req.user.role },
      ),
    );
  }
  static async delete(req: Request, res: Response) {
    await new DisciplinaRealizadaService().delete(Number(req.params.id));
    res.status(204).end();
  }
  static async update(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new DisciplinaRealizadaService().update(
          Number(req.params.id),
          req.body,
        ),
      );
  }
}
