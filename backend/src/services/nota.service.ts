import type { Avaliacao, Nota } from '@prisma/client';
import { NotaRepository } from '../repositories/nota.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error.js';
import { AvaliacaoRepository } from '../repositories/avaliacao.repository.js';

export class NotaService {
  private notaRepository: NotaRepository;
  private avaliacaoRepository: AvaliacaoRepository;

  constructor() {
    this.notaRepository = new NotaRepository();
    this.avaliacaoRepository = new AvaliacaoRepository();
  }

  async create(avaliacaoId: number, data: Omit<Nota, 'id'>[]) {
    const avaliacao = await this.avaliacaoRepository.getById(avaliacaoId);
    if (!avaliacao) throw new UnprocessableEntityError('Avaliação inexistente');

    for (const n of data) {
      if (Number(n.valorObtido) > avaliacao.valor)
        throw new UnprocessableEntityError(
          'A nota não pode ser maior que o valor da avaliação',
        );
      if (Number(n.valorObtido) < 0)
        throw new UnprocessableEntityError('A nota não pode ser negativa');

      const nota =
        await this.notaRepository.verificaSeJaANotaPorAvaliacaoEMatricula(
          n.matriculaId,
          n.avaliacaoId,
        );
      if (nota)
        throw new UnprocessableEntityError(
          'Já existe nota desse aluno nessa avaliação',
        );
    }
    await this.notaRepository.create(data);
  }
  async getAllByMatricula(matriculaId: number): Promise<Nota[]> {
    return this.notaRepository.getAllByMatricula(matriculaId);
  }
  async getAllByAvaliacao(avaliacaoId: number): Promise<Nota[]> {
    return this.notaRepository.getAllByAvaliacao(avaliacaoId);
  }

  async getById(id: number): Promise<Nota | null> {
    const nota = await this.notaRepository.getById(id);
    if (!nota) throw new NotFoundError('Nota não encontrado!');
    return nota;
  }

  async update(avaliacaoId: number, data: Pick<Nota, 'id' | 'valorObtido'>[]) {
    const avaliacao = await this.avaliacaoRepository.getById(avaliacaoId);
    if (!avaliacao) throw new UnprocessableEntityError('Avaliação inexistente');
    for (const n of data) {
      const nota = await this.getById(n.id);
      if (!nota) throw new NotFoundError('Nota não encontrada!');
      if (Number(n.valorObtido) > avaliacao.valor)
        throw new UnprocessableEntityError(
          'A nota não pode ser maior que o valor da avaliação',
        );
      if (Number(n.valorObtido) < 0)
        throw new UnprocessableEntityError('A nota não pode ser negativa');
    }
    await this.notaRepository.update(data);
  }

  async delete(id: number) {
    await this.getById(id);
    await this.notaRepository.delete(id);
  }
}
