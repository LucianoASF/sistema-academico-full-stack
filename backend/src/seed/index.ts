import { PrismaClient } from '@prisma/client';
import { seedUsuarios } from './usuario.seed.js';
import { seedCursos } from './cursos.seed.js';
import { seedDisciplinas } from './disciplinas.seed.js';
import { seedGrades } from './grades.seed.js';
import { seedMatriculasCursos } from './matriculasCursos.seed.js';
import { seedAulas } from './aulas.seed.js';
import { seedAvaliacoes } from './avaliacoes.seed.js';
import { seedMatriculas } from './matriculas.seed.js';
import { seedPresencas } from './presencas.seed.js';
import { seedNotas } from './notas.seed.js';
import { seedDisciplinasRealizadas } from './disciplinasRealizadas.seed.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seeds...');
  await seedUsuarios();
  await seedCursos();
  await seedDisciplinas();
  await seedGrades();
  await seedDisciplinasRealizadas();
  await seedMatriculasCursos();
  await seedAulas();
  await seedAvaliacoes();
  await seedMatriculas();
  await seedPresencas();
  await seedNotas();
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
