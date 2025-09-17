import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedMatriculasCursos() {
  await prisma.matriculaCurso.createMany({
    data: [
      {
        id: 1,
        status: 'cursando',
        dataInicio: new Date('2024-06-01'),
        alunoId: 2,
        gradeId: 1,
      },
      {
        id: 2,
        status: 'cursando',
        dataInicio: new Date('2024-06-01'),
        alunoId: 3,
        gradeId: 1,
      },
      {
        id: 3,
        status: 'finalizado',
        dataInicio: new Date('2018-06-01'),
        alunoId: 5,
        gradeId: 3,
      },
      {
        id: 4,
        status: 'finalizado',
        dataInicio: new Date('2018-06-01'),
        dataFim: new Date('2022-07-22'),
        alunoId: 6,
        gradeId: 1,
      },
      {
        id: 5,
        status: 'cursando',
        dataInicio: new Date('2013-06-01'),
        alunoId: 8,
        gradeId: 5,
      },
    ],
    skipDuplicates: true, // evita duplicar ao rodar várias vezes
  });
}
