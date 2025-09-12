import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
  static async login(req: Request, res: Response) {
    res.json(await new AuthService().login(req.body));
  }
}
