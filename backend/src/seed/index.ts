import { PrismaClient } from '@prisma/client';
import { seedUsuarios } from './usuario.seed.js';
import { seedCursos } from './cursos.seed.js';
import { seedDisciplinas } from './disciplinas.seed.js';
import { seedGrades } from './grades.seed.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seeds...');
  await seedUsuarios();
  await seedCursos();
  await seedDisciplinas();
  await seedGrades();
  console.log('Seeds finalizados!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
