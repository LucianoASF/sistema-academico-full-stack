import { PrismaClient, type Aula } from '@prisma/client';

export class AulaRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(aula: Omit<Aula, 'id'>): Promise<Aula> {
    return await this.prisma.aula.create({
      data: aula,
    });
  }
  async getAllByDisciplinaRealizada(
    disciplinaRealizadaId: number,
  ): Promise<Aula[]> {
    return this.prisma.aula.findMany({ where: { disciplinaRealizadaId } });
  }
  async getById(id: number): Promise<Aula | null> {
    return this.prisma.aula.findFirst({ where: { id } });
  }
  async delete(id: number) {
    await this.prisma.aula.delete({ where: { id } });
  }
  async update(id: number, data: Omit<Aula, 'id'>): Promise<Aula | null> {
    return this.prisma.aula.update({ where: { id }, data });
  }
}
