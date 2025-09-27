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
  async getById(id: number, professorId?: number) {
    return this.prisma.disciplinaRealizada.findFirst({
      where: professorId
        ? { id, professorId, dataFim: null }
        : { id, dataFim: null },
      include: { disciplina: true },
    });
  }
  async getDisciplinasEmCusroByProfessor(professorId: number) {
    return this.prisma.disciplinaRealizada.findMany({
      where: { professorId, dataFim: null },
      include: { disciplina: true },
    });
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
