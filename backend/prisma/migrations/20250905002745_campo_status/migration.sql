/*
  Warnings:

  - Added the required column `status` to the `matriculas_cursos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `matriculas_cursos` ADD COLUMN `status` ENUM('cursando', 'finalizado', 'trancado', 'abandonado') NOT NULL;
