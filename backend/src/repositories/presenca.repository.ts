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
  async getAllByMatricula(
    matriculaId: number,
    usuarioId: number,
    isAluno = false,
  ): Promise<Presenca[]> {
    return this.prisma.presenca.findMany({
      where: isAluno
        ? { matriculaId, matricula: { alunoId: usuarioId } }
        : { matriculaId },
      include: { aula: true },
    });
  }
  async getAllByAula(
    aulaId: number,
    professorId?: number,
  ): Promise<Presenca[]> {
    return this.prisma.presenca.findMany({
      where: professorId
        ? { aulaId, aula: { disciplinaRealizada: { professorId } } }
        : { aulaId },
      include: {
        matricula: { select: { usuario: { select: { nome: true } } } },
      },
    });
  }

  async update(
    id: number,
    data: Pick<Presenca, 'presente'>,
    professorId?: number,
  ): Promise<Presenca | null> {
    return this.prisma.presenca.update({
      where: professorId
        ? { id, aula: { disciplinaRealizada: { professorId } } }
        : { id },
      data,
    });
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
