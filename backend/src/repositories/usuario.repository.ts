import { PrismaClient, type Usuario } from '@prisma/client';

export class UsuarioRepository {
  private prisma: PrismaClient;
  private selectUsuarioSemSenha = {
    id: true,
    nome: true,
    email: true,
    telefone: true,
    cpf: true,
    dataNascimento: true,
    role: true,
  };
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(usuario: Omit<Usuario, 'id'>): Promise<Omit<Usuario, 'senha'>> {
    return await this.prisma.usuario.create({
      data: usuario,
      select: this.selectUsuarioSemSenha,
    });
  }
  async getById(id: number): Promise<Omit<Usuario, 'senha'> | null> {
    return await this.prisma.usuario.findFirst({
      where: { id },
      select: this.selectUsuarioSemSenha,
    });
  }
  async delete(id: number): Promise<Usuario | null> {
    return await this.prisma.usuario.delete({ where: { id } });
  }
  async update(
    id: number,
    dados: Partial<Omit<Usuario, 'id'>>,
  ): Promise<Omit<Usuario, 'senha'>> {
    return this.prisma.usuario.update({
      where: { id },
      data: dados,
      select: this.selectUsuarioSemSenha,
    });
  }
  async updatePassword(
    id: number,
    senha: string,
  ): Promise<Omit<Usuario, 'senha'>> {
    return this.prisma.usuario.update({
      where: { id },
      data: { senha },
      select: this.selectUsuarioSemSenha,
    });
  }
  async findByEmail(email: string): Promise<Omit<Usuario, 'senha'> | null> {
    return this.prisma.usuario.findFirst({
      where: { email },
      select: this.selectUsuarioSemSenha,
    });
  }
  async findByCpf(cpf: string): Promise<Omit<Usuario, 'senha'> | null> {
    return this.prisma.usuario.findFirst({
      where: { cpf },
      select: this.selectUsuarioSemSenha,
    });
  }
}
