import type { Grade } from '@prisma/client';
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

  async getById(id: number): Promise<Grade | null> {
    const grade = await this.gradeRepository.getById(id);
    if (!grade) throw new NotFoundError('Grade não encontrada!');
    return grade;
  }

  async delete(id: number) {
    await this.getById(id);
    await this.gradeRepository.delete(id);
  }

  async getAllByCurso(cursoId: number): Promise<Grade[]> {
    return this.gradeRepository.getAllByCurso(cursoId);
  }
}
