import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedNotas() {
  await prisma.nota.createMany({
    data: [
      {
        id: 1,
        valorObtido: 8.4,
        matriculaId: 1,
        avaliacaoId: 1,
      },
      {
        id: 2,
        valorObtido: 15.25,
        matriculaId: 1,
        avaliacaoId: 2,
      },
      {
        id: 3,
        valorObtido: 20,
        matriculaId: 1,
        avaliacaoId: 3,
      },
      {
        id: 4,
        valorObtido: 16.5,
        matriculaId: 1,
        avaliacaoId: 4,
      },
      {
        id: 5,
        valorObtido: 22,
        matriculaId: 1,
        avaliacaoId: 5,
      },
    ],
    skipDuplicates: true, // evita duplicar ao rodar várias vezes
  });
}
