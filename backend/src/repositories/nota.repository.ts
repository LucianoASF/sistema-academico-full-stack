import { PrismaClient, type Nota } from '@prisma/client';

export class NotaRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(nota: Omit<Nota, 'id'>[]) {
    await this.prisma.nota.createMany({
      data: nota,
      skipDuplicates: true,
    });
  }
  async getAllByMatricula(matriculaId: number): Promise<Nota[]> {
    return this.prisma.nota.findMany({
      where: { matriculaId },
      include: { avaliacao: true },
    });
  }
  async getAllByAvaliacao(avaliacaoId: number): Promise<Nota[]> {
    return this.prisma.nota.findMany({
      where: { avaliacaoId },
      include: {
        matricula: { select: { usuario: { select: { nome: true } } } },
      },
    });
  }
  async update(data: Pick<Nota, 'id' | 'valorObtido'>[]) {
    await this.prisma.$transaction(
      data.map((n: Pick<Nota, 'id' | 'valorObtido'>) =>
        this.prisma.nota.update({
          where: { id: n.id },
          data: { valorObtido: n.valorObtido },
        }),
      ),
    );
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
