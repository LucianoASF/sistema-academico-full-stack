import type { Request, Response } from 'express';
import { AvaliacaoService } from '../services/avaliacao.service.js';

export class AvaliacaoController {
  static async create(req: Request, res: Response) {
    const { disciplinaRealizadaId } = req.params;
    res.status(201).json(
      await new AvaliacaoService().create({
        ...req.body,
        disciplinaRealizadaId: Number(disciplinaRealizadaId),
      }),
    );
  }
  static async getAllByDisciplinaRealizada(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new AvaliacaoService().getAllByDisciplinaRealizada(
          Number(req.params.disciplinaRealizadaId),
        ),
      );
  }
  static async getById(req: Request, res: Response) {
    res
      .status(200)
      .json(await new AvaliacaoService().getById(Number(req.params.id)));
  }
  static async delete(req: Request, res: Response) {
    await new AvaliacaoService().delete(Number(req.params.id));
    res.status(204).end();
  }
  static async update(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new AvaliacaoService().update(Number(req.params.id), req.body),
      );
  }
}
