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

  // Atualizar usuário sem senha
  async update(
    id: number,
    data: Omit<Usuario, 'id' | 'senha'>,
  ): Promise<Omit<Usuario, 'senha'>> {
    await this.getById(id);
    const usuarioByEmail = await this.usuarioRepository.findByEmail(data.email);
    if (usuarioByEmail && usuarioByEmail.id !== id)
      throw new EmailAlreadyExistsError();
    const usuarioByCpf = await this.usuarioRepository.findByCpf(data.cpf);
    if (usuarioByCpf && usuarioByCpf.id !== id)
      throw new CpfAlreadyExistsError();

    return this.usuarioRepository.update(id, data);
  }

  async updatePassword(
    id: number,
    { senha }: Pick<Usuario, 'senha'>,
  ): Promise<Omit<Usuario, 'senha'>> {
    await this.getById(id);
    const senhaCrypto = await bcrypt.hash(senha, 10);
    return this.usuarioRepository.updatePassword(id, senhaCrypto);
  }

  async delete(id: number) {
    await this.getById(id);
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
