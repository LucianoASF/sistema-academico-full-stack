import { PrismaClient, type Grade } from '@prisma/client';

export class GradeRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(grade: Omit<Grade, 'id'>): Promise<Grade> {
    return await this.prisma.grade.create({ data: grade });
  }
  async getById(id: number, alunoId?: number): Promise<Grade | null> {
    return this.prisma.grade.findFirst({
      where: alunoId ? { id, matriculaCurso: { some: { alunoId } } } : { id },
      include: { disciplinas: true },
    });
  }
  async delete(id: number) {
    await this.prisma.grade.delete({ where: { id } });
  }
  async getAllByCurso(cursoId: number): Promise<Grade[]> {
    return this.prisma.grade.findMany({
      where: { cursoId },
      include: { disciplinas: true },
    });
  }
  async conectarDisciplinasNaGrade(disciplinas: number[], gradeId: number) {
    await this.prisma.grade.update({
      where: { id: gradeId },
      data: {
        disciplinas: {
          connect: disciplinas.map((disciplinaId) => ({ id: disciplinaId })),
        },
      },
    });
  }
  async desconectarDisciplinasNaGrade(disciplinas: number[], gradeId: number) {
    await this.prisma.grade.update({
      where: { id: gradeId },
      data: {
        disciplinas: {
          disconnect: disciplinas.map((disciplinaId) => ({ id: disciplinaId })),
        },
      },
    });
  }
}
