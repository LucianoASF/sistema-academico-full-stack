import type { Presenca } from '@prisma/client';
import { PresencaRepository } from '../repositories/presenca.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error.js';
import { AulaRepository } from '../repositories/aula.repository.js';

export class PresencaService {
  private presencaRepository: PresencaRepository;
  private aulaRepository: AulaRepository;

  constructor() {
    this.presencaRepository = new PresencaRepository();
    this.aulaRepository = new AulaRepository();
  }

  async create(data: Omit<Presenca, 'id'>[]) {
    for (const p of data) {
      const presenca =
        await this.presencaRepository.verificaSeJaAPresencaPorAvaliacaoEMatricula(
          p.matriculaId,
          p.aulaId,
        );
      if (presenca)
        throw new UnprocessableEntityError(
          'Já existe presença desse aluno nessa aula',
        );
    }
    await this.presencaRepository.create(data);
  }
  async getAllByMatricula(matriculaId: number): Promise<Presenca[]> {
    return this.presencaRepository.getAllByMatricula(matriculaId);
  }
  async getAllByAula(aulaId: number): Promise<Presenca[]> {
    return this.presencaRepository.getAllByAula(aulaId);
  }

  async getById(id: number): Promise<Presenca | null> {
    const presenca = await this.presencaRepository.getById(id);
    if (!presenca) throw new NotFoundError('Presenca não encontrada!');
    return presenca;
  }

  async update(data: Pick<Presenca, 'id' | 'presente'>[]) {
    for (const p of data) {
      await this.getById(p.id);
    }
    await this.presencaRepository.update(data);
  }

  async delete(id: number) {
    await this.getById(id);
    await this.presencaRepository.delete(id);
  }
}
