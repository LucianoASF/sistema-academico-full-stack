import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedDisciplinas() {
  await prisma.disciplina.createMany({
    data: [
      {
        id: 1,
        nome: 'Programação Orientada a Objetos',
        quantidadeAulas: 80,
      },
      {
        id: 2,
        nome: 'Estruturas de Dados',
        quantidadeAulas: 60,
      },
      {
        id: 3,
        nome: 'Banco de Dados',
        quantidadeAulas: 70,
      },
      {
        id: 4,
        nome: 'Engenharia de Software',
        quantidadeAulas: 60,
      },
      {
        id: 5,
        nome: 'Sistemas Operacionais',
        quantidadeAulas: 50,
      },
      {
        id: 6,
        nome: 'Redes de Computadores',
        quantidadeAulas: 60,
      },
      {
        id: 7,
        nome: 'Inteligência Artificial',
        quantidadeAulas: 40,
      },
      {
        id: 8,
        nome: 'Desenvolvimento Web',
        quantidadeAulas: 70,
      },
      {
        id: 9,
        nome: 'Matemática Discreta',
        quantidadeAulas: 50,
      },
      {
        id: 10,
        nome: 'Segurança da Informação',
        quantidadeAulas: 40,
      },
    ],
    skipDuplicates: true, // evita duplicar ao rodar várias vezes
  });
}
