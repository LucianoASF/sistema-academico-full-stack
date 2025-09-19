import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAvaliacoes() {
  await prisma.avaliacao.createMany({
    data: [
      {
        id: 1,
        nome: 'Prova I',
        data: new Date('2025-08-08'),
        valor: 10,
        disciplinaRealizadaId: 3,
      },
      {
        id: 2,
        nome: 'Prova II',
        data: new Date('2025-09-08'),
        valor: 30,
        disciplinaRealizadaId: 3,
      },
      {
        id: 3,
        nome: 'Trabalho I',
        data: new Date('2025-08-10'),
        valor: 20,
        disciplinaRealizadaId: 3,
      },
      {
        id: 4,
        nome: 'Trabalho II',
        data: new Date('2025-09-10'),
        valor: 20,
        disciplinaRealizadaId: 3,
      },
      {
        id: 5,
        nome: 'Prova III',
        data: new Date('2025-08-10'),
        valor: 20,
        disciplinaRealizadaId: 3,
      },
    ],
    skipDuplicates: true, // evita duplicar ao rodar várias vezes
  });
}
