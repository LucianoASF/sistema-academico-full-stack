import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedGrades() {
  await prisma.grade.createMany({
    data: [
      {
        id: 1,
        versao: 1,
        cursoId: 1,
      },
      {
        id: 2,
        versao: 2,
        cursoId: 1,
      },
      {
        id: 3,
        versao: 1,
        cursoId: 2,
      },
      {
        id: 4,
        versao: 2,
        cursoId: 2,
      },
      {
        id: 5,
        versao: 1,
        cursoId: 5,
      },
      {
        id: 6,
        versao: 1,
        cursoId: 6,
      },
      {
        id: 7,
        versao: 3,
        cursoId: 1,
      },
      {
        id: 8,
        versao: 1,
        cursoId: 8,
      },
      {
        id: 9,
        versao: 1,
        cursoId: 9,
      },
      {
        id: 10,
        versao: 1,
        cursoId: 10,
      },
    ],
    skipDuplicates: true, // evita duplicar ao rodar várias vezes
  });
  await prisma.grade.update({
    where: { id: 1 },
    data: {
      disciplinas: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
        ],
      },
    },
  });
}
