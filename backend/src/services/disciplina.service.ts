import type { Disciplina } from '@prisma/client';
import { DisciplinaRepository } from '../repositories/disciplina.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';

export class DisciplinaService {
  private disciplinaRepository: DisciplinaRepository;

  constructor() {
    this.disciplinaRepository = new DisciplinaRepository();
  }

  async create(data: Omit<Disciplina, 'id'>): Promise<Disciplina> {
    return this.disciplinaRepository.create(data);
  }
  async getAll(): Promise<Disciplina[]> {
    return this.disciplinaRepository.getAll();
  }

  async getById(id: number): Promise<Disciplina | null> {
    const disciplina = await this.disciplinaRepository.getById(id);
    if (!disciplina) throw new NotFoundError('Disciplina não encontrado!');
    return disciplina;
  }

  async delete(id: number) {
    const disciplina = await this.disciplinaRepository.delete(id);
    if (!disciplina) throw new NotFoundError('Disciplina não encontrado!');
  }
}
