import type { Usuario } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsuarioRepository } from '../repositories/usuario.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';
import { EmailAlreadyExistsError } from '../errors/email-already-exists.error.js';
import { CpfAlreadyExistsError } from '../errors/cpf-already-exists.error.js';
import { UnauthorizedError } from '../errors/unauthorized.error.js';

export class UsuarioService {
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  // Criar usuário com hash de senha
  async create(data: Omit<Usuario, 'id'>): Promise<Omit<Usuario, 'senha'>> {
    const emailEmUso = await this.usuarioRepository.findByEmail(data.email);
    if (emailEmUso) throw new EmailAlreadyExistsError();
    const cpfEmUso = await this.usuarioRepository.findByCpf(data.cpf);
    if (cpfEmUso) throw new CpfAlreadyExistsError();
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    return this.usuarioRepository.create({
      ...data,
      senha: hashedPassword,
    });
  }

  async getById(id: number): Promise<Omit<Usuario, 'senha'> | null> {
    const usuario = await this.usuarioRepository.getById(id);
    if (!usuario) throw new NotFoundError('Usuário não encontrado!');
    return usuario;
  }

  async buscaUsuarios(
    busca?: string,
    role?: Usuario['role'],
    completo?: boolean,
  ): Promise<Pick<Usuario, 'id' | 'nome'>[] | Omit<Usuario, 'senha'>> {
    return this.usuarioRepository.buscaUsuarios(busca, role, completo);
  }

  // Atualizar usuário sem senha
  async update(
    id: number,
    data: Omit<Usuario, 'id'>,
  ): Promise<Omit<Usuario, 'senha'>> {
    const usuario = await this.usuarioRepository.getById(id);
    if (!usuario) throw new NotFoundError('Usuário não encontrado!');
    const usuarioByEmail = await this.usuarioRepository.findByEmail(data.email);
    if (usuarioByEmail && usuarioByEmail.id !== id)
      throw new EmailAlreadyExistsError();
    const usuarioByCpf = await this.usuarioRepository.findByCpf(data.cpf);
    if (usuarioByCpf && usuarioByCpf.id !== id)
      throw new CpfAlreadyExistsError();
    if (data.senha) {
      const hashedPassword = await bcrypt.hash(data.senha, 10);
      return this.usuarioRepository.update(id, {
        ...data,
        senha: hashedPassword,
      });
    }

    return this.usuarioRepository.update(id, data);
  }

  async delete(id: number) {
    const usuario = await this.usuarioRepository.getById(id);
    if (!usuario) throw new NotFoundError('Usuário não encontrado!');
    await this.usuarioRepository.delete(id);
  }

  perfilDecodificadoJwt(token: string) {
    if (!token) throw new UnauthorizedError('Não autenticado!');
    try {
      const dados = jwt.verify(token, process.env.SECRET!);
      return dados;
    } catch (error) {
      throw new UnauthorizedError('Token inválido!');
    }
  }
}
