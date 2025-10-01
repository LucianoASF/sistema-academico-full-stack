/*
  Warnings:

  - You are about to alter the column `valor_obtido` on the `notas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE `notas` MODIFY `valor_obtido` DECIMAL(5, 2) NOT NULL;
