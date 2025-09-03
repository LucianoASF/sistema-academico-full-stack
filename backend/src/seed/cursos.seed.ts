import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedCursos() {
  await prisma.curso.createMany({
    data: [
      {
        id: 1,
        nome: 'Sistemas de Informação',
      },
      {
        id: 2,
        nome: 'Administração',
      },
      {
        id: 3,
        nome: 'Marketing',
      },
      {
        id: 4,
        nome: 'Filosofia',
      },
      {
        id: 5,
        nome: 'Medicina',
      },
      {
        id: 6,
        nome: 'Enfermagem',
      },
      {
        id: 7,
        nome: 'Biomedicina',
      },
      {
        id: 8,
        nome: 'História',
      },
      {
        id: 9,
        nome: 'Física',
      },
      {
        id: 10,
        nome: 'Engenharia de Software',
      },
    ],
    skipDuplicates: true,
  });
}
