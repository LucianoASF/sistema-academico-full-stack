import { PrismaClient, type Avaliacao } from '@prisma/client';

export class AvaliacaoRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(avaliacao: Omit<Avaliacao, 'id'>): Promise<Avaliacao> {
    return await this.prisma.avaliacao.create({
      data: avaliacao,
    });
  }
  async getAllByDisciplinaRealizada(
    disciplinaRealizadaId: number,
  ): Promise<Avaliacao[]> {
    return this.prisma.avaliacao.findMany({ where: { disciplinaRealizadaId } });
  }
  async getById(id: number): Promise<Avaliacao | null> {
    return this.prisma.avaliacao.findFirst({ where: { id } });
  }
  async delete(id: number) {
    await this.prisma.avaliacao.delete({ where: { id } });
  }
  async update(
    id: number,
    data: Omit<Avaliacao, 'id'>,
  ): Promise<Avaliacao | null> {
    return this.prisma.avaliacao.update({ where: { id }, data });
  }
}
