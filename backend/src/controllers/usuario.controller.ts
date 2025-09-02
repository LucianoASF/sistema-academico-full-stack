import type { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service.js';

export class UsuarioController {
  static async create(req: Request, res: Response) {
    res.status(201).json(await new UsuarioService().create(req.body));
  }
  static async getById(req: Request, res: Response) {
    res
      .status(200)
      .json(await new UsuarioService().getById(Number(req.params.id)));
  }
  static async delete(req: Request, res: Response) {
    await new UsuarioService().delete(Number(req.params.id));
    res.status(204).end();
  }
  static async update(req: Request, res: Response) {
    res
      .status(200)
      .json(await new UsuarioService().update(Number(req.params.id), req.body));
  }
  static async updatePassword(req: Request, res: Response) {
    res
      .status(200)
      .json(
        await new UsuarioService().updatePassword(
          Number(req.params.id),
          req.body,
        ),
      );
  }
}
