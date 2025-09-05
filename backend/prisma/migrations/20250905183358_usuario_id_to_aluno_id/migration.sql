/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `matriculas_cursos` table. All the data in the column will be lost.
  - Added the required column `aluno_id` to the `matriculas_cursos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `matriculas_cursos` DROP FOREIGN KEY `matriculas_cursos_usuario_id_fkey`;

-- DropIndex
DROP INDEX `matriculas_cursos_usuario_id_fkey` ON `matriculas_cursos`;

-- AlterTable
ALTER TABLE `matriculas_cursos` DROP COLUMN `usuario_id`,
    ADD COLUMN `aluno_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `matriculas_cursos` ADD CONSTRAINT `matriculas_cursos_aluno_id_fkey` FOREIGN KEY (`aluno_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
