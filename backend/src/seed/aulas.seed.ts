import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAulas() {
  await prisma.aula.createMany({
    data: [
      {
        id: 1,
        titulo: 'Aula I',
        descricao: 'Descrição da aula I',
        disciplinaRealizadaId: 3,
      },
      {
        id: 2,
        titulo: 'Aula II',
        descricao: 'Descrição da aula II',
        disciplinaRealizadaId: 3,
      },
      {
        id: 3,
        titulo: 'Aula III',
        descricao: 'Descrição da aula III',
        disciplinaRealizadaId: 3,
      },
      {
        id: 4,
        titulo: 'Aula IV',
        descricao: 'Descrição da aula IV',
        disciplinaRealizadaId: 3,
      },
      {
        id: 5,
        titulo: 'Aula V',
        descricao: 'Descrição da aula V',
        disciplinaRealizadaId: 3,
      },
    ],
    skipDuplicates: true, // evita duplicar ao rodar várias vezes
  });
}
