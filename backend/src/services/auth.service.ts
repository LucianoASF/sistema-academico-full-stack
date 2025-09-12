import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Usuario } from '@prisma/client';
import { UsuarioRepository } from '../repositories/usuario.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';

export class AuthService {
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }
  async login(data: Pick<Usuario, 'email' | 'senha'>): Promise<string> {
    const usuario = await this.usuarioRepository.getByEmailWithPassword(
      data.email,
    );
    if (!usuario) throw new NotFoundError('Usuário e/ou senha incorretos');
    const senhaCorreta = await bcrypt.compare(data.senha, usuario.senha);
    if (!senhaCorreta) throw new NotFoundError('Usuário e/ou senha incorretos');

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, role: usuario.role },
      process.env.SECRET!,
      {
        expiresIn: 86400,
      },
    );
    return token;
  }
}
