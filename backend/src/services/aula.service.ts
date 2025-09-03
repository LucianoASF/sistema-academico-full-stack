import type { Aula } from '@prisma/client';
import { AulaRepository } from '../repositories/aula.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';

export class AulaService {
  private aulaRepository: AulaRepository;

  constructor() {
    this.aulaRepository = new AulaRepository();
  }

  async create(data: Omit<Aula, 'id'>): Promise<Aula> {
    return this.aulaRepository.create(data);
  }
  async getAllByDisciplinaRealizada(
    disciplinaRealizadaId: number,
  ): Promise<Aula[]> {
    return this.aulaRepository.getAllByDisciplinaRealizada(
      disciplinaRealizadaId,
    );
  }

  async getById(id: number): Promise<Aula | null> {
    const aula = await this.aulaRepository.getById(id);
    if (!aula) throw new NotFoundError('Aula não encontrado!');
    return aula;
  }

  async update(id: number, data: Omit<Aula, 'id'>): Promise<Aula> {
    await this.getById(id);
    const aula = await this.aulaRepository.update(id, data);
    if (!aula) throw new NotFoundError('Aula não encontrado!');
    return aula;
  }

  async delete(id: number) {
    await this.getById(id);
    await this.aulaRepository.delete(id);
  }
}
