import type { Avaliacao } from '@prisma/client';
import { AvaliacaoRepository } from '../repositories/avaliacao.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error.js';

export class AvaliacaoService {
  private avaliacaoRepository: AvaliacaoRepository;

  constructor() {
    this.avaliacaoRepository = new AvaliacaoRepository();
  }

  async create(data: Omit<Avaliacao, 'id'>): Promise<Avaliacao> {
    const avaliacoes = await this.getAllByDisciplinaRealizada(
      data.disciplinaRealizadaId,
    );
    const somaAvaliacoes = avaliacoes.reduce(
      (acc, avaliacao) => acc + avaliacao.valor,
      0,
    );
    if (somaAvaliacoes >= 100 || somaAvaliacoes + data.valor > 100)
      throw new UnprocessableEntityError(
        'A disciplina não pode ter mais que 100 pontos',
      );
    return this.avaliacaoRepository.create(data);
  }
  async getAllByDisciplinaRealizada(
    disciplinaRealizadaId: number,
  ): Promise<Avaliacao[]> {
    return this.avaliacaoRepository.getAllByDisciplinaRealizada(
      disciplinaRealizadaId,
    );
  }

  async getById(id: number): Promise<Avaliacao | null> {
    const avaliacao = await this.avaliacaoRepository.getById(id);
    if (!avaliacao) throw new NotFoundError('Avaliacao não encontrada!');
    return avaliacao;
  }

  async update(id: number, data: Omit<Avaliacao, 'id'>): Promise<Avaliacao> {
    const avaliacaoAntesDoUpdate = await this.getById(id);
    const avaliacoes = await this.getAllByDisciplinaRealizada(
      data.disciplinaRealizadaId,
    );
    const somaAvaliacoes = avaliacoes.reduce(
      (acc, avaliacao) => acc + avaliacao.valor,
      0,
    );
    if (
      somaAvaliacoes > 100 ||
      (avaliacaoAntesDoUpdate!.valor < data.valor &&
        somaAvaliacoes + data.valor - avaliacaoAntesDoUpdate!.valor > 100)
    )
      throw new UnprocessableEntityError(
        'Essa disciplina já esta com 100 pontos lançados',
      );
    const avaliacao = await this.avaliacaoRepository.update(id, data);
    if (!avaliacao) throw new NotFoundError('Avaliacao não encontrada!');
    return avaliacao;
  }

  async delete(id: number) {
    await this.getById(id);
    await this.avaliacaoRepository.delete(id);
  }
}
