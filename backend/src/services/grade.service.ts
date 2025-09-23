import type { Grade, Usuario } from '@prisma/client';
import { GradeRepository } from '../repositories/grade.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';

export class GradeService {
  private gradeRepository: GradeRepository;

  constructor() {
    this.gradeRepository = new GradeRepository();
  }

  async create(cursoId: number): Promise<Grade> {
    const grades = await this.getAllByCurso(cursoId);
    let maiorVersao = 0;
    grades.forEach((grade) =>
      grade.versao > maiorVersao ? (maiorVersao = grade.versao) : grade,
    );
    maiorVersao++;
    return this.gradeRepository.create({ versao: maiorVersao, cursoId });
  }

  async getById(
    id: number,
    user: Pick<Usuario, 'id' | 'role'>,
  ): Promise<Grade | null> {
    let grade;
    if (user.role === 'aluno') {
      grade = await this.gradeRepository.getById(id, user.id, true);
    } else {
      grade = await this.gradeRepository.getById(id, 0);
    }
    if (!grade) throw new NotFoundError('Grade não encontrada!');
    return grade;
  }

  async delete(id: number) {
    const grade = await this.gradeRepository.getById(id, 0);
    if (!grade) throw new NotFoundError('Grade não encontrada!');
    await this.gradeRepository.delete(id);
  }

  async getAllByCurso(cursoId: number): Promise<Grade[]> {
    return this.gradeRepository.getAllByCurso(cursoId);
  }
}
