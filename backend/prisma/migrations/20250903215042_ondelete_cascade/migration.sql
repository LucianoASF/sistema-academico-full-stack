-- DropForeignKey
ALTER TABLE `aulas` DROP FOREIGN KEY `aulas_disciplina_realizada_id_fkey`;

-- DropForeignKey
ALTER TABLE `avaliacoes` DROP FOREIGN KEY `avaliacoes_disciplina_realizada_id_fkey`;

-- DropForeignKey
ALTER TABLE `disciplinas_realizadas` DROP FOREIGN KEY `disciplinas_realizadas_disciplina_id_fkey`;

-- DropForeignKey
ALTER TABLE `disciplinas_realizadas` DROP FOREIGN KEY `disciplinas_realizadas_professor_id_fkey`;

-- DropForeignKey
ALTER TABLE `grades` DROP FOREIGN KEY `grades_curso_id_fkey`;

-- DropForeignKey
ALTER TABLE `matriculas` DROP FOREIGN KEY `matriculas_aluno_id_fkey`;

-- DropForeignKey
ALTER TABLE `matriculas` DROP FOREIGN KEY `matriculas_disciplina_realizada_id_fkey`;

-- DropForeignKey
ALTER TABLE `notas` DROP FOREIGN KEY `notas_avaliacao_id_fkey`;

-- DropForeignKey
ALTER TABLE `notas` DROP FOREIGN KEY `notas_matricula_id_fkey`;

-- DropForeignKey
ALTER TABLE `presencas` DROP FOREIGN KEY `presencas_aula_id_fkey`;

-- DropForeignKey
ALTER TABLE `presencas` DROP FOREIGN KEY `presencas_matricula_id_fkey`;

-- DropIndex
DROP INDEX `aulas_disciplina_realizada_id_fkey` ON `aulas`;

-- DropIndex
DROP INDEX `avaliacoes_disciplina_realizada_id_fkey` ON `avaliacoes`;

-- DropIndex
DROP INDEX `disciplinas_realizadas_disciplina_id_fkey` ON `disciplinas_realizadas`;

-- DropIndex
DROP INDEX `disciplinas_realizadas_professor_id_fkey` ON `disciplinas_realizadas`;

-- DropIndex
DROP INDEX `grades_curso_id_fkey` ON `grades`;

-- DropIndex
DROP INDEX `matriculas_aluno_id_fkey` ON `matriculas`;

-- DropIndex
DROP INDEX `matriculas_disciplina_realizada_id_fkey` ON `matriculas`;

-- DropIndex
DROP INDEX `notas_avaliacao_id_fkey` ON `notas`;

-- DropIndex
DROP INDEX `notas_matricula_id_fkey` ON `notas`;

-- DropIndex
DROP INDEX `presencas_aula_id_fkey` ON `presencas`;

-- DropIndex
DROP INDEX `presencas_matricula_id_fkey` ON `presencas`;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `disciplinas_realizadas` ADD CONSTRAINT `disciplinas_realizadas_disciplina_id_fkey` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplinas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `disciplinas_realizadas` ADD CONSTRAINT `disciplinas_realizadas_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aulas` ADD CONSTRAINT `aulas_disciplina_realizada_id_fkey` FOREIGN KEY (`disciplina_realizada_id`) REFERENCES `disciplinas_realizadas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliacoes` ADD CONSTRAINT `avaliacoes_disciplina_realizada_id_fkey` FOREIGN KEY (`disciplina_realizada_id`) REFERENCES `disciplinas_realizadas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matriculas` ADD CONSTRAINT `matriculas_aluno_id_fkey` FOREIGN KEY (`aluno_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matriculas` ADD CONSTRAINT `matriculas_disciplina_realizada_id_fkey` FOREIGN KEY (`disciplina_realizada_id`) REFERENCES `disciplinas_realizadas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `presencas` ADD CONSTRAINT `presencas_matricula_id_fkey` FOREIGN KEY (`matricula_id`) REFERENCES `matriculas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `presencas` ADD CONSTRAINT `presencas_aula_id_fkey` FOREIGN KEY (`aula_id`) REFERENCES `aulas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_matricula_id_fkey` FOREIGN KEY (`matricula_id`) REFERENCES `matriculas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_avaliacao_id_fkey` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
