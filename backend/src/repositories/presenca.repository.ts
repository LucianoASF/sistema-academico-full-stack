import { PrismaClient, type Presenca } from '@prisma/client';

export class PresencaRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(data: Omit<Presenca, 'id'>[]) {
    await this.prisma.presenca.createMany({
      data,
      skipDuplicates: true,
    });
  }
  async getAllByMatricula(matriculaId: number): Promise<Presenca[]> {
    return this.prisma.presenca.findMany({
      where: { matriculaId },
      include: { aula: true },
    });
  }
  async getAllByAula(aulaId: number): Promise<Presenca[]> {
    return this.prisma.presenca.findMany({
      where: { aulaId },
      include: {
        matricula: { select: { usuario: { select: { nome: true } } } },
      },
    });
  }
  async getAllByDisciplinaRealizada(
    disciplinaRealizadaId: number,
  ): Promise<Presenca[]> {
    return this.prisma.presenca.findMany({
      where: { aula: { disciplinaRealizadaId } },
    });
  }

  async update(data: Pick<Presenca, 'id' | 'presente'>[]) {
    await this.prisma.$transaction(
      data.map((p: { id: number; presente: boolean }) =>
        this.prisma.presenca.update({
          where: { id: p.id },
          data: { presente: p.presente },
        }),
      ),
    );
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
