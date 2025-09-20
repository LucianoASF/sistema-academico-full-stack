import type { Presenca, Usuario } from '@prisma/client';
import { PresencaRepository } from '../repositories/presenca.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error.js';

export class PresencaService {
  private presencaRepository: PresencaRepository;

  constructor() {
    this.presencaRepository = new PresencaRepository();
  }

  async create(data: Omit<Presenca, 'id'>): Promise<Presenca> {
    const presenca =
      await this.presencaRepository.verificaSeJaAPresencaPorAvaliacaoEMatricula(
        data.matriculaId,
        data.aulaId,
      );
    if (presenca)
      throw new UnprocessableEntityError(
        'Já existe presença desse aluno nessa aula',
      );
    return this.presencaRepository.create(data);
  }
  async getAllByMatricula(
    matriculaId: number,
    usuario: Pick<Usuario, 'id' | 'role'>,
  ): Promise<Presenca[]> {
    if (usuario.role === 'aluno') {
      return this.presencaRepository.getAllByMatricula(
        matriculaId,
        usuario.id,
        true,
      );
    }
    return this.presencaRepository.getAllByMatricula(matriculaId, usuario.id);
  }
  async getAllByAula(aulaId: number): Promise<Presenca[]> {
    return this.presencaRepository.getAllByAula(aulaId);
  }

  async getById(id: number): Promise<Presenca | null> {
    const presenca = await this.presencaRepository.getById(id);
    if (!presenca) throw new NotFoundError('Presenca não encontrada!');
    return presenca;
  }

  async update(
    id: number,
    data: Pick<Presenca, 'presente'>,
  ): Promise<Presenca> {
    await this.getById(id);
    const presenca = await this.presencaRepository.update(id, data);
    if (!presenca) throw new NotFoundError('Presenca não encontrada!');
    return presenca;
  }

  async delete(id: number) {
    await this.getById(id);
    await this.presencaRepository.delete(id);
  }
}
