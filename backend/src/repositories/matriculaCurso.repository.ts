import { PrismaClient, type MatriculaCurso } from '@prisma/client';

export class MatriculaCursoRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(
    matriculaCurso: Omit<MatriculaCurso, 'id'>,
  ): Promise<MatriculaCurso> {
    return await this.prisma.matriculaCurso.create({
      data: matriculaCurso,
    });
  }
  async getAllByAluno(alunoId: number): Promise<MatriculaCurso[]> {
    return this.prisma.matriculaCurso.findMany({
      where: { alunoId },
      include: { grade: { include: { curso: true } } },
    });
  }
  async getAllByCurso(cursoId: number): Promise<MatriculaCurso[]> {
    return this.prisma.matriculaCurso.findMany({
      where: { grade: { cursoId } },
    });
  }
  async getById(id: number): Promise<MatriculaCurso | null> {
    return this.prisma.matriculaCurso.findFirst({ where: { id } });
  }
  async delete(id: number) {
    await this.prisma.matriculaCurso.delete({ where: { id } });
  }
  async update(
    id: number,
    data: Omit<MatriculaCurso, 'id'>,
  ): Promise<MatriculaCurso | null> {
    return this.prisma.matriculaCurso.update({ where: { id }, data });
  }
}
