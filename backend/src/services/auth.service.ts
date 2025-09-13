import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Usuario } from '@prisma/client';
import { UsuarioRepository } from '../repositories/usuario.repository.js';
import { UnauthorizedError } from '../errors/unauthorized.error.js';

export class AuthService {
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }
  async login(data: Pick<Usuario, 'email' | 'senha'>): Promise<string> {
    const usuario = await this.usuarioRepository.getByEmailWithPassword(
      data.email,
    );
    if (!usuario) throw new UnauthorizedError();
    const senhaCorreta = await bcrypt.compare(data.senha, usuario.senha);
    if (!senhaCorreta) throw new UnauthorizedError();

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.SECRET!,
      {
        expiresIn: 86400,
      },
    );
    return token;
  }
}
