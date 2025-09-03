import { PrismaClient, type DisciplinaRealizada } from '@prisma/client';

export class DisciplinaRealizadaRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(
    disciplinaRealizada: Omit<DisciplinaRealizada, 'id'>,
  ): Promise<DisciplinaRealizada> {
    return await this.prisma.disciplinaRealizada.create({
      data: disciplinaRealizada,
    });
  }
  async getAll(): Promise<DisciplinaRealizada[]> {
    return this.prisma.disciplinaRealizada.findMany();
  }
  async getById(id: number): Promise<DisciplinaRealizada | null> {
    return this.prisma.disciplinaRealizada.findFirst({ where: { id } });
  }
  async delete(id: number) {
    await this.prisma.disciplinaRealizada.delete({ where: { id } });
  }
  async update(
    id: number,
    data: Omit<DisciplinaRealizada, 'id'>,
  ): Promise<DisciplinaRealizada | null> {
    return this.prisma.disciplinaRealizada.update({ where: { id }, data });
  }
}
