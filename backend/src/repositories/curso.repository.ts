import { PrismaClient, type Curso } from '@prisma/client';

export class CursoRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ['query'] });
  }
  async create(curso: Omit<Curso, 'id'>): Promise<Curso> {
    return await this.prisma.curso.create({ data: curso });
  }
  async getAll(): Promise<Curso[]> {
    return this.prisma.curso.findMany();
  }
  async getById(id: number): Promise<Curso | null> {
    return this.prisma.curso.findFirst({ where: { id } });
  }
  async delete(id: number): Promise<Curso | null> {
    return await this.prisma.curso.delete({ where: { id } });
  }
  async update(id: number, data: Omit<Curso, 'id'>): Promise<Curso | null> {
    return this.prisma.curso.update({ where: { id }, data });
  }
}
