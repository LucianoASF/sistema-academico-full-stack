import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
  static async login(req: Request, res: Response) {
    console.log(req.body, 'aaaaa');
    const token = await new AuthService().login(req.body);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ mensagem: 'Login realizado' });
  }
  static logout(req: Request, res: Response) {
    res.clearCookie('token');
    res.json({ mensagem: 'Logout realizado' });
  }
}
