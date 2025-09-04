import { PrismaClient, type Nota } from '@prisma/client';

export class NotaRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(nota: Omit<Nota, 'id'>): Promise<Nota> {
    return await this.prisma.nota.create({
      data: nota,
    });
  }
  async getAllByMatricula(matriculaId: number): Promise<Nota[]> {
    return this.prisma.nota.findMany({ where: { matriculaId } });
  }

  async update(
    id: number,
    data: Pick<Nota, 'valorObtido'>,
  ): Promise<Nota | null> {
    return this.prisma.nota.update({ where: { id }, data });
  }

  async getById(id: number): Promise<Nota | null> {
    return this.prisma.nota.findFirst({ where: { id } });
  }
  async delete(id: number) {
    await this.prisma.nota.delete({ where: { id } });
  }
  async verificaSeJaANotaPorAvaliacaoEMatricula(
    matriculaId: number,
    avaliacaoId: number,
  ): Promise<Nota | null> {
    return this.prisma.nota.findFirst({ where: { matriculaId, avaliacaoId } });
  }
}
