import type { Presenca, Usuario } from '@prisma/client';
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

  async create(
    data: Omit<Presenca, 'id'>,
    user: Pick<Usuario, 'id' | 'role'>,
  ): Promise<Presenca> {
    if (user.role !== 'administrador') {
      const aula = await this.aulaRepository.getById(data.aulaId, user.id);
      if (!aula) throw new NotFoundError('Aula não encontrada');
    }
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
  async getAllByAula(
    aulaId: number,
    user: Pick<Usuario, 'id' | 'role'>,
  ): Promise<Presenca[]> {
    return this.presencaRepository.getAllByAula(
      aulaId,
      user.role === 'professor' ? user.id : undefined,
    );
  }

  async getById(id: number): Promise<Presenca | null> {
    const presenca = await this.presencaRepository.getById(id);
    if (!presenca) throw new NotFoundError('Presenca não encontrada!');
    return presenca;
  }

  async update(
    id: number,
    data: Pick<Presenca, 'presente'>,
    user: Pick<Usuario, 'id' | 'role'>,
  ): Promise<Presenca> {
    await this.getById(id);
    const presenca = await this.presencaRepository.update(
      id,
      data,
      user.role === 'professor' ? user.id : undefined,
    );
    if (!presenca) throw new NotFoundError('Presenca não encontrada!');
    return presenca;
  }

  async delete(id: number) {
    await this.getById(id);
    await this.presencaRepository.delete(id);
  }
}
