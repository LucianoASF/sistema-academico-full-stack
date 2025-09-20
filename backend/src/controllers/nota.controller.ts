import type { Request, Response } from 'express';
import { NotaService } from '../services/nota.service.js';

export class NotaController {
  static async create(req: Request, res: Response) {
    res.status(201).json(await new NotaService().create(req.body));
  }
  static async getAllByMatricula(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new NotaService().getAllByMatricula(
          Number(req.params.matriculaId),
          { id: req.user.id, role: req.user.role },
        ),
      );
  }
  static async getById(req: Request, res: Response) {
    res
      .status(200)
      .json(await new NotaService().getById(Number(req.params.id)));
  }
  static async delete(req: Request, res: Response) {
    await new NotaService().delete(Number(req.params.id));
    res.status(204).end();
  }
  static async update(req: Request, res: Response) {
    res
      .status(200)
      .json(await new NotaService().update(Number(req.params.id), req.body));
  }
}
