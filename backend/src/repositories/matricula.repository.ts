import { PrismaClient, type Matricula } from '@prisma/client';
import type { getMatriculasCursandoByAlunoType } from '../types/getMatriculasCursandoByAluno.js';
import type { getMatriculasByAlunoType } from '../types/getMatriculasByAluno.js';

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
  async getMatriculasByAluno(
    alunoId: number,
  ): Promise<getMatriculasByAlunoType[]> {
    return this.prisma.matricula.findMany({
      where: { alunoId },
      select: {
        id: true,
        notaFinal: true,
        presencaFinal: true,
        status: true,
        alunoId: true,
        disciplinaRealizadaId: true,
        disciplinaRealizada: {
          select: { dataInicio: true, dataFim: true, disciplinaId: true },
        },
      },
    });
  }
  async getMatriculasCursandoByAluno(
    alunoId: number,
  ): Promise<getMatriculasCursandoByAlunoType[]> {
    const result = await this.prisma.matricula.findMany({
      where: { alunoId, status: 'cursando' },
      select: {
        id: true,
        alunoId: true,
        disciplinaRealizadaId: true,
        disciplinaRealizada: {
          select: {
            disciplina: { select: { nome: true } },
            usuario: { select: { nome: true } }, // ainda é "usuario"
          },
        },
      },
    });

    // renomeia o campo usuario -> professor
    return result.map((matricula) => ({
      ...matricula,
      disciplinaRealizada: {
        disciplina: matricula.disciplinaRealizada.disciplina,
        professor: matricula.disciplinaRealizada.usuario, // novo campo
      },
    }));
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
