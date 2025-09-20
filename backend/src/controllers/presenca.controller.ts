import type { Request, Response } from 'express';
import { PresencaService } from '../services/presenca.service.js';

export class PresencaController {
  static async create(req: Request, res: Response) {
    res.status(201).json(await new PresencaService().create(req.body));
  }
  static async getAllByMatricula(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new PresencaService().getAllByMatricula(
          Number(req.params.matriculaId),
          { id: req.user.id, role: req.user.role },
        ),
      );
  }
  static async getAllByAula(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new PresencaService().getAllByAula(Number(req.params.aulaId)),
      );
  }
  static async getById(req: Request, res: Response) {
    res
      .status(200)
      .json(await new PresencaService().getById(Number(req.params.id)));
  }
  static async delete(req: Request, res: Response) {
    await new PresencaService().delete(Number(req.params.id));
    res.status(204).end();
  }
  static async update(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new PresencaService().update(Number(req.params.id), req.body),
      );
  }
}
