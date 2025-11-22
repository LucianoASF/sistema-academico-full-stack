import { PrismaClient, type Disciplina } from '@prisma/client';

export class DisciplinaRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(disciplina: Omit<Disciplina, 'id'>): Promise<Disciplina> {
    return await this.prisma.disciplina.create({ data: disciplina });
  }
  async getAll(): Promise<Disciplina[]> {
    return this.prisma.disciplina.findMany();
  }
  async getById(id: number): Promise<Disciplina | null> {
    return this.prisma.disciplina.findFirst({ where: { id } });
  }
  async delete(id: number) {
    await this.prisma.disciplina.delete({ where: { id } });
  }
}
