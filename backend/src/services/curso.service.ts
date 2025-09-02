import type { Curso } from '@prisma/client';
import { CursoRepository } from '../repositories/curso.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';

export class CursoService {
  private cursoRepository: CursoRepository;

  constructor() {
    this.cursoRepository = new CursoRepository();
  }

  async create(data: Omit<Curso, 'id'>): Promise<Curso> {
    return this.cursoRepository.create(data);
  }
  async getAll(): Promise<Curso[]> {
    return this.cursoRepository.getAll();
  }

  async getById(id: number): Promise<Curso | null> {
    const curso = await this.cursoRepository.getById(id);
    if (!curso) throw new NotFoundError('Curso não encontrado!');
    return curso;
  }

  async update(id: number, data: Omit<Curso, 'id'>): Promise<Curso> {
    const curso = await this.cursoRepository.update(id, data);
    if (!curso) throw new NotFoundError('Curso não encontrado!');
    return curso;
  }

  async delete(id: number) {
    const curso = await this.cursoRepository.delete(id);
    if (!curso) throw new NotFoundError('Curso não encontrado!');
  }
}
