import type { MatriculaCurso } from '@prisma/client';
import { MatriculaCursoRepository } from '../repositories/matriculaCurso.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';
import { UsuarioRepository } from '../repositories/usuario.repository.js';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error.js';
import { verificaSeDataFimEhMaiorQueDataInicio } from '../utils/verificaSeDataFimEhMaiorQueDataInicio.js';

export class MatriculaCursoService {
  private matriculaCursoRepository: MatriculaCursoRepository;
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.matriculaCursoRepository = new MatriculaCursoRepository();
    this.usuarioRepository = new UsuarioRepository();
  }

  async create(data: Omit<MatriculaCurso, 'id'>): Promise<MatriculaCurso> {
    const usuario = await this.usuarioRepository.getById(data.alunoId);
    if (usuario?.role !== 'aluno') {
      console.log(usuario);
      throw new UnprocessableEntityError('Esse usuário não é um aluno');
    }
    verificaSeDataFimEhMaiorQueDataInicio(data.dataInicio, data.dataFim);
    return this.matriculaCursoRepository.create(data);
  }
  async getAllByAluno(alunoId: number): Promise<MatriculaCurso[]> {
    return this.matriculaCursoRepository.getAllByAluno(alunoId);
  }
  async getAll(): Promise<MatriculaCurso[]> {
    return this.matriculaCursoRepository.getAll();
  }

  async getById(id: number): Promise<MatriculaCurso | null> {
    const matriculaCurso = await this.matriculaCursoRepository.getById(id);
    if (!matriculaCurso)
      throw new NotFoundError('Matricula do Curso não encontrada!');
    return matriculaCurso;
  }

  async update(
    id: number,
    data: Omit<MatriculaCurso, 'id'>,
  ): Promise<MatriculaCurso> {
    await this.getById(id);
    verificaSeDataFimEhMaiorQueDataInicio(data.dataInicio, data.dataFim);
    const matriculaCurso = await this.matriculaCursoRepository.update(id, data);
    if (!matriculaCurso)
      throw new NotFoundError('Matricula do Curso não encontrada!');
    return matriculaCurso;
  }

  async delete(id: number) {
    await this.getById(id);
    await this.matriculaCursoRepository.delete(id);
  }
}
