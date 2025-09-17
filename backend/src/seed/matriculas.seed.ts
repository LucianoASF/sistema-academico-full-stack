import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedMatriculas() {
  await prisma.matricula.createMany({
    data: [
      {
        id: 1,
        notaFinal: null,
        presencaFinal: null,
        status: 'cursando',
        alunoId: 2,
        disciplinaRealizadaId: 3,
      },
      {
        id: 2,
        notaFinal: 85,
        presencaFinal: 78,
        status: 'aprovado',
        alunoId: 2,
        disciplinaRealizadaId: 1,
      },
      {
        id: 3,
        notaFinal: 58,
        presencaFinal: 52,
        status: 'reprovado',
        alunoId: 2,
        disciplinaRealizadaId: 2,
      },
      {
        id: 4,
        notaFinal: null,
        presencaFinal: null,
        status: 'cursando',
        alunoId: 2,
        disciplinaRealizadaId: 4,
      },
      {
        id: 5,
        notaFinal: null,
        presencaFinal: null,
        status: 'cursando',
        alunoId: 2,
        disciplinaRealizadaId: 5,
      },
    ],
    skipDuplicates: true, // evita duplicar ao rodar várias vezes
  });
}
