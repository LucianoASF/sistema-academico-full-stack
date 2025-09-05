/*
  Warnings:

  - The values [usuario] on the enum `usuarios_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_cursotousuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_cursotousuario` DROP FOREIGN KEY `_CursoToUsuario_A_fkey`;

-- DropForeignKey
ALTER TABLE `_cursotousuario` DROP FOREIGN KEY `_CursoToUsuario_B_fkey`;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `role` ENUM('administrador', 'aluno', 'professor') NOT NULL;

-- DropTable
DROP TABLE `_cursotousuario`;

-- CreateTable
CREATE TABLE `matriculas_cursos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_inicio` DATETIME(3) NOT NULL,
    `data_fim` DATETIME(3) NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `curso_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `matriculas_cursos` ADD CONSTRAINT `matriculas_cursos_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matriculas_cursos` ADD CONSTRAINT `matriculas_cursos_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
