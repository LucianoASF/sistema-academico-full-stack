import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPresencas() {
  await prisma.presenca.createMany({
    data: [
      {
        id: 1,
        presente: true,
        matriculaId: 1,
        aulaId: 1,
      },
      {
        id: 2,
        presente: true,
        matriculaId: 1,
        aulaId: 2,
      },
      {
        id: 3,
        presente: false,
        matriculaId: 1,
        aulaId: 3,
      },
      {
        id: 4,
        presente: true,
        matriculaId: 1,
        aulaId: 4,
      },
      {
        id: 5,
        presente: true,
        matriculaId: 1,
        aulaId: 5,
      },
    ],
    skipDuplicates: true, // evita duplicar ao rodar várias vezes
  });
}
