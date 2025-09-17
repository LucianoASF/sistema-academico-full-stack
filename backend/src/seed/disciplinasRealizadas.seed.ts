import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDisciplinasRealizadas() {
  await prisma.disciplinaRealizada.createMany({
    data: [
      {
        id: 1,
        dataInicio: new Date('2024-07-01'),
        disciplinaId: 1,
        professorId: 4,
        dataFim: new Date('2025-01-01'),
      },
      {
        id: 2,
        dataInicio: new Date('2024-07-01'),
        disciplinaId: 2,
        professorId: 7,
        dataFim: new Date('2025-01-01'),
      },
      {
        id: 3,
        dataInicio: new Date('2025-07-01'),
        disciplinaId: 3,
        professorId: 7,
      },
      {
        id: 4,
        dataInicio: new Date('2025-07-01'),
        disciplinaId: 4,
        professorId: 4,
      },
      {
        id: 5,
        dataInicio: new Date('2025-07-01'),
        disciplinaId: 5,
        professorId: 7,
      },
      {
        id: 6,
        dataInicio: new Date('2025-07-01'),
        disciplinaId: 6,
        professorId: 4,
      },
    ],
    skipDuplicates: true, // evita duplicar ao rodar várias vezes
  });
}
