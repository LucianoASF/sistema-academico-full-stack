import type { Avaliacao } from '@prisma/client';
import { AvaliacaoRepository } from '../repositories/avaliacao.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';

export class AvaliacaoService {
  private avaliacaoRepository: AvaliacaoRepository;

  constructor() {
    this.avaliacaoRepository = new AvaliacaoRepository();
  }

  async create(data: Omit<Avaliacao, 'id'>): Promise<Avaliacao> {
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
    await this.getById(id);
    const avaliacao = await this.avaliacaoRepository.update(id, data);
    if (!avaliacao) throw new NotFoundError('Avaliacao não encontrada!');
    return avaliacao;
  }

  async delete(id: number) {
    await this.getById(id);
    await this.avaliacaoRepository.delete(id);
  }
}
