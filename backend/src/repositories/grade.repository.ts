import { PrismaClient, type Grade } from '@prisma/client';

export class GradeRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(grade: Omit<Grade, 'id'>): Promise<Grade> {
    return await this.prisma.grade.create({ data: grade });
  }
  async getById(
    id: number,
    alunoId: number,
    isAluno = false,
  ): Promise<Grade | null> {
    return this.prisma.grade.findFirst({
      where: isAluno ? { id, matriculaCurso: { some: { alunoId } } } : { id },
      include: { disciplinas: true },
    });
  }
  async delete(id: number) {
    await this.prisma.grade.delete({ where: { id } });
  }
  async getAllByCurso(cursoId: number): Promise<Grade[]> {
    return this.prisma.grade.findMany({ where: { cursoId } });
  }
}
