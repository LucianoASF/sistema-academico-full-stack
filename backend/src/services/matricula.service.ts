import type { Matricula } from '@prisma/client';
import { MatriculaRepository } from '../repositories/matricula.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';
import { UsuarioRepository } from '../repositories/usuario.repository.js';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error.js';
import type { getMatriculasCursandoByAlunoType } from '../types/getMatriculasCursandoByAluno.js';
import type { getMatriculasByAlunoType } from '../types/getMatriculasByAluno.js';

export class MatriculaService {
  private matriculaRepository: MatriculaRepository;
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.matriculaRepository = new MatriculaRepository();
    this.usuarioRepository = new UsuarioRepository();
  }

  async create(data: Omit<Matricula, 'id'>): Promise<Matricula> {
    const usuario = await this.usuarioRepository.getById(data.alunoId);
    if (usuario?.role !== 'aluno')
      throw new UnprocessableEntityError(
        'O usuário informado deve ser um aluno',
      );
    const matricula =
      await this.matriculaRepository.verificaSeJaEstaMatriculado(
        data.alunoId,
        data.disciplinaRealizadaId,
      );
    if (matricula)
      throw new UnprocessableEntityError(
        'O Aluno já esta matriculado na disciplina',
      );
    return this.matriculaRepository.create(data);
  }
  async getAllByDisciplinaRealizada(
    disciplinaRealizadaId: number,
  ): Promise<Matricula[]> {
    return this.matriculaRepository.getAllByDisciplinaRealizada(
      disciplinaRealizadaId,
    );
  }

  async getById(id: number): Promise<Matricula | null> {
    const matricula = await this.matriculaRepository.getById(id);
    if (!matricula) throw new NotFoundError('Matricula não encontrada!');
    return matricula;
  }
  async getMatriculasByAluno(
    alunoId: number,
  ): Promise<getMatriculasByAlunoType[]> {
    return this.matriculaRepository.getMatriculasByAluno(alunoId);
  }
  async getMatriculasCursandoByAluno(
    alunoId: number,
  ): Promise<getMatriculasCursandoByAlunoType[]> {
    return this.matriculaRepository.getMatriculasCursandoByAluno(alunoId);
  }

  async update(
    id: number,
    data: Pick<Matricula, 'presencaFinal' | 'notaFinal' | 'status'>,
  ): Promise<Matricula> {
    await this.getById(id);
    const matricula = await this.matriculaRepository.update(id, data);
    if (!matricula) throw new NotFoundError('Matricula não encontrada!');
    return matricula;
  }

  async delete(id: number) {
    await this.getById(id);
    await this.matriculaRepository.delete(id);
  }
}
