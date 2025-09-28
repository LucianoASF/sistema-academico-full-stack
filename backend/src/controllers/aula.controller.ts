import type { Request, Response } from 'express';
import { AulaService } from '../services/aula.service.js';

export class AulaController {
  static async create(req: Request, res: Response) {
    const { disciplinaRealizadaId } = req.params;
    res.status(201).json(
      await new AulaService().create({
        ...req.body,
        disciplinaRealizadaId: Number(disciplinaRealizadaId),
      }),
    );
  }
  static async getAllByDisciplinaEmAndamento(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new AulaService().getAllByDisciplinaEmAndamento(
          Number(req.params.disciplinaRealizadaId),
        ),
      );
  }
  static async getById(req: Request, res: Response) {
    res
      .status(200)
      .json(await new AulaService().getById(Number(req.params.id)));
  }
  static async delete(req: Request, res: Response) {
    await new AulaService().delete(Number(req.params.id));
    res.status(204).end();
  }
  static async update(req: Request, res: Response) {
    res
      .status(200)
      .json(await new AulaService().update(Number(req.params.id), req.body));
  }
}
