import type { Request, Response } from 'express';
import { PresencaService } from '../services/presenca.service.js';

export class PresencaController {
  static async create(req: Request, res: Response) {
    const aulaId = Number(req.params.aulaId);
    const presencas = req.body.map((p: any) => ({ ...p, aulaId }));
    await new PresencaService().create(presencas);
    res.status(201).json({ mensagem: 'Sucesso' });
  }
  static async getAllByMatricula(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new PresencaService().getAllByMatricula(
          Number(req.params.matriculaId),
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
    await new PresencaService().update(req.body);
    res.status(200).json({ mensagem: 'sucesso' });
  }
}
