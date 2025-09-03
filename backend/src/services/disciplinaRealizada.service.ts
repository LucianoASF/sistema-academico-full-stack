import type { DisciplinaRealizada } from '@prisma/client';
import { DisciplinaRealizadaRepository } from '../repositories/disciplinaRealizada.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';
import { UsuarioRepository } from '../repositories/usuario.repository.js';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error.js';

export class DisciplinaRealizadaService {
  private disciplinaRealizadaRepository: DisciplinaRealizadaRepository;
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.disciplinaRealizadaRepository = new DisciplinaRealizadaRepository();
    this.usuarioRepository = new UsuarioRepository();
  }
  private async verificaSeEhProfessor(usuarioId: number) {
    const usuario = await this.usuarioRepository.getById(usuarioId);
    if (usuario?.role !== 'professor')
      throw new UnprocessableEntityError(
        'O usuário informado deve ser um professor',
      );
  }
  private verificaSeDataFimEhMaiorQueDataInicio(
    dataInicio: Date,
    dataFim: Date | null,
  ) {
    if (dataFim) {
      if (dataInicio >= dataFim)
        throw new UnprocessableEntityError(
          'A data de fim deve ser maior que a data de início',
        );
    }
  }

  async create(
    data: Omit<DisciplinaRealizada, 'id'>,
  ): Promise<DisciplinaRealizada> {
    await this.verificaSeEhProfessor(data.professorId);
    this.verificaSeDataFimEhMaiorQueDataInicio(data.dataInicio, data.dataFim);
    return this.disciplinaRealizadaRepository.create(data);
  }
  async getAll(): Promise<DisciplinaRealizada[]> {
    return this.disciplinaRealizadaRepository.getAll();
  }

  async getById(id: number): Promise<DisciplinaRealizada | null> {
    const disciplinaRealizada =
      await this.disciplinaRealizadaRepository.getById(id);
    if (!disciplinaRealizada)
      throw new NotFoundError('Disciplina Realizada não encontrada!');
    return disciplinaRealizada;
  }

  async update(
    id: number,
    data: Omit<DisciplinaRealizada, 'id'>,
  ): Promise<DisciplinaRealizada> {
    await this.getById(id);
    await this.verificaSeEhProfessor(data.professorId);
    this.verificaSeDataFimEhMaiorQueDataInicio(data.dataInicio, data.dataFim);
    const disciplinaRealizada = await this.disciplinaRealizadaRepository.update(
      id,
      data,
    );
    if (!disciplinaRealizada)
      throw new NotFoundError('Disciplina Realizada não encontrada!');
    return disciplinaRealizada;
  }

  async delete(id: number) {
    await this.getById(id);
    await this.disciplinaRealizadaRepository.delete(id);
  }
}
