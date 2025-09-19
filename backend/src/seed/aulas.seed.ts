import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAulas() {
  await prisma.aula.createMany({
    data: [
      {
        id: 1,
        titulo: 'Aula I',
        descricao: 'Descrição da aula I',
        data: new Date('2025-07-14'),
        disciplinaRealizadaId: 3,
      },
      {
        id: 2,
        titulo: 'Aula II',
        descricao: 'Descrição da aula II',
        data: new Date('2025-07-20'),
        disciplinaRealizadaId: 3,
      },
      {
        id: 3,
        titulo: 'Aula III',
        descricao: 'Descrição da aula III',
        data: new Date('2025-07-29'),
        disciplinaRealizadaId: 3,
      },
      {
        id: 4,
        titulo: 'Aula IV',
        data: new Date('2025-08-14'),
        descricao: 'Descrição da aula IV',
        disciplinaRealizadaId: 3,
      },
      {
        id: 5,
        titulo: 'Aula V',
        descricao: 'Descrição da aula V',
        data: new Date('2025-09-14'),
        disciplinaRealizadaId: 3,
      },
    ],
    skipDuplicates: true, // evita duplicar ao rodar várias vezes
  });
}
