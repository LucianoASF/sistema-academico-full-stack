import { PrismaClient, type Presenca } from '@prisma/client';

export class PresencaRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(presenca: Omit<Presenca, 'id'>): Promise<Presenca> {
    return await this.prisma.presenca.create({
      data: presenca,
    });
  }
  async getAllByMatricula(matriculaId: number): Promise<Presenca[]> {
    return this.prisma.presenca.findMany({ where: { matriculaId } });
  }
  async getAllByAula(aulaId: number): Promise<Presenca[]> {
    return this.prisma.presenca.findMany({ where: { aulaId } });
  }

  async update(
    id: number,
    data: Pick<Presenca, 'presente'>,
  ): Promise<Presenca | null> {
    return this.prisma.presenca.update({ where: { id }, data });
  }

  async getById(id: number): Promise<Presenca | null> {
    return this.prisma.presenca.findFirst({ where: { id } });
  }
  async delete(id: number) {
    await this.prisma.presenca.delete({ where: { id } });
  }
  async verificaSeJaAPresencaPorAvaliacaoEMatricula(
    matriculaId: number,
    aulaId: number,
  ): Promise<Presenca | null> {
    return this.prisma.presenca.findFirst({ where: { matriculaId, aulaId } });
  }
}
