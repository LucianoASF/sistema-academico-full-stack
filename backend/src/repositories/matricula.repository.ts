import { PrismaClient, type Matricula } from '@prisma/client';

export class MatriculaRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(matricula: Omit<Matricula, 'id'>): Promise<Matricula> {
    return await this.prisma.matricula.create({
      data: matricula,
    });
  }
  async getAllByDisciplinaRealizada(
    disciplinaRealizadaId: number,
  ): Promise<Matricula[]> {
    return this.prisma.matricula.findMany({ where: { disciplinaRealizadaId } });
  }
  async getById(id: number): Promise<Matricula | null> {
    return this.prisma.matricula.findFirst({ where: { id } });
  }
  async delete(id: number) {
    await this.prisma.matricula.delete({ where: { id } });
  }
  async update(
    id: number,
    data: Pick<Matricula, 'presencaFinal' | 'notaFinal' | 'status'>,
  ): Promise<Matricula | null> {
    return this.prisma.matricula.update({ where: { id }, data });
  }
  async verificaSeJaEstaMatriculado(
    alunoId: number,
    disciplinaRealizadaId: number,
  ): Promise<Matricula | null> {
    return this.prisma.matricula.findFirst({
      where: { alunoId, disciplinaRealizadaId },
    });
  }
}
