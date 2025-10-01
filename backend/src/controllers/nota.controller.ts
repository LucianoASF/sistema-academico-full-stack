import type { Request, Response } from 'express';
import { NotaService } from '../services/nota.service.js';

export class NotaController {
  static async create(req: Request, res: Response) {
    const avaliacaoId = Number(req.params.avaliacaoId);
    const notas = req.body.map((n: any) => ({ ...n, avaliacaoId }));
    await new NotaService().create(avaliacaoId, notas);
    res.status(201).json({ mensagem: 'Sucesso' });
  }
  static async getAllByMatricula(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new NotaService().getAllByMatricula(
          Number(req.params.matriculaId),
        ),
      );
  }
  static async getAllByAvaliacao(req: Request, res: Response) {
    res.json(
      await new NotaService().getAllByAvaliacao(Number(req.params.avaliacaoId)),
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
    await new NotaService().update(Number(req.params.avaliacaoId), req.body);
    res.status(200).json({ mensagem: 'sucesso' });
  }
}
