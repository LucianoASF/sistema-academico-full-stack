import type { Aula } from '@prisma/client';
import { AulaRepository } from '../repositories/aula.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';
import { DisciplinaRealizadaRepository } from '../repositories/disciplinaRealizada.repository.js';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error.js';

export class AulaService {
  private aulaRepository: AulaRepository;
  private disciplinaRealizadaRepository: DisciplinaRealizadaRepository;

  constructor() {
    this.aulaRepository = new AulaRepository();
    this.disciplinaRealizadaRepository = new DisciplinaRealizadaRepository();
  }

  async create(data: Omit<Aula, 'id'>): Promise<Aula> {
    const aulas = await this.getAllByDisciplinaEmAndamento(
      data.disciplinaRealizadaId,
    );
    const disciplinaEMCurso = await this.disciplinaRealizadaRepository.getById(
      data.disciplinaRealizadaId,
    );
    if (!disciplinaEMCurso)
      throw new NotFoundError('Disciplina em andamento não encontrada');
    let numeroAulas = 0;
    for (const aula of aulas) {
      numeroAulas++;
    }
    if (numeroAulas >= disciplinaEMCurso.disciplina.quantidadeAulas)
      throw new UnprocessableEntityError('A carga horária já está completa');
    return this.aulaRepository.create(data);
  }
  async getAllByDisciplinaEmAndamento(
    disciplinaRealizadaId: number,
  ): Promise<Aula[]> {
    return this.aulaRepository.getAllByDisciplinaEmAndamento(
      disciplinaRealizadaId,
    );
  }

  async getById(id: number): Promise<Aula | null> {
    const aula = await this.aulaRepository.getById(id);
    if (!aula) throw new NotFoundError('Aula não encontrada!');
    return aula;
  }

  async update(id: number, data: Omit<Aula, 'id'>): Promise<Aula> {
    await this.getById(id);
    const aulas = await this.getAllByDisciplinaEmAndamento(
      data.disciplinaRealizadaId,
    );
    const disciplinaEMCurso = await this.disciplinaRealizadaRepository.getById(
      data.disciplinaRealizadaId,
    );
    if (!disciplinaEMCurso)
      throw new NotFoundError('Disciplina em andamento não encontrada');
    let numeroAulas = 0;
    for (const aula of aulas) {
      numeroAulas++;
    }
    if (numeroAulas >= disciplinaEMCurso.disciplina.quantidadeAulas)
      throw new UnprocessableEntityError('A carga horária já está completa');
    const aula = await this.aulaRepository.update(id, data);
    if (!aula) throw new NotFoundError('Aula não encontrada!');
    return aula;
  }

  async delete(id: number) {
    const data = await this.getById(id);
    const disciplinaEMCurso = await this.disciplinaRealizadaRepository.getById(
      data!.disciplinaRealizadaId,
    );
    if (!disciplinaEMCurso)
      throw new NotFoundError('Disciplina em andamento não encontrada');
    await this.aulaRepository.delete(id);
  }
}
