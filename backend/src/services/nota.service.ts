import type { Nota, Usuario } from '@prisma/client';
import { NotaRepository } from '../repositories/nota.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error.js';

export class NotaService {
  private notaRepository: NotaRepository;

  constructor() {
    this.notaRepository = new NotaRepository();
  }

  async create(data: Omit<Nota, 'id'>): Promise<Nota> {
    const nota =
      await this.notaRepository.verificaSeJaANotaPorAvaliacaoEMatricula(
        data.matriculaId,
        data.avaliacaoId,
      );
    if (nota)
      throw new UnprocessableEntityError(
        'Já existe nota desse aluno nessa avaliação',
      );
    return this.notaRepository.create(data);
  }
  async getAllByMatricula(
    matriculaId: number,
    userRole: Pick<Usuario, 'role' | 'id'>,
  ): Promise<Nota[]> {
    if (userRole.role === 'aluno') {
      return this.notaRepository.getAllByMatricula(
        matriculaId,
        userRole.id,
        true,
      );
    } else {
      return this.notaRepository.getAllByMatricula(matriculaId, userRole.id);
    }
  }

  async getById(id: number): Promise<Nota | null> {
    const nota = await this.notaRepository.getById(id);
    if (!nota) throw new NotFoundError('Nota não encontrado!');
    return nota;
  }

  async update(id: number, data: Pick<Nota, 'valorObtido'>): Promise<Nota> {
    await this.getById(id);
    const nota = await this.notaRepository.update(id, data);
    if (!nota) throw new NotFoundError('Nota não encontrado!');
    return nota;
  }

  async delete(id: number) {
    await this.getById(id);
    await this.notaRepository.delete(id);
  }
}
