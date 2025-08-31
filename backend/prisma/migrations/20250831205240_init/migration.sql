-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(11) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `senha` VARCHAR(60) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    UNIQUE INDEX `Usuario_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disciplina` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `quantidade_aulas` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `versao` INTEGER NOT NULL,
    `curso_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disciplinas_realizadas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_inicio` DATETIME(3) NOT NULL,
    `data_fim` DATETIME(3) NULL,
    `disciplina_id` INTEGER NOT NULL,
    `professor_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aula` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(100) NOT NULL,
    `disciplina_realizada_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Avaliacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `valor` INTEGER NOT NULL,
    `disciplina_realizada_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matricula` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nota_final` INTEGER NULL,
    `presenca_final` INTEGER NULL,
    `aluno_id` INTEGER NOT NULL,
    `disciplina_realizada_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presenca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `presente` BOOLEAN NOT NULL,
    `matricula_id` INTEGER NOT NULL,
    `aula_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nota` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor_obtido` DECIMAL(4, 2) NOT NULL,
    `matricula_id` INTEGER NOT NULL,
    `avaliacao_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CursoToUsuario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CursoToUsuario_AB_unique`(`A`, `B`),
    INDEX `_CursoToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DisciplinaToGrade` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DisciplinaToGrade_AB_unique`(`A`, `B`),
    INDEX `_DisciplinaToGrade_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `disciplinas_realizadas` ADD CONSTRAINT `disciplinas_realizadas_disciplina_id_fkey` FOREIGN KEY (`disciplina_id`) REFERENCES `Disciplina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `disciplinas_realizadas` ADD CONSTRAINT `disciplinas_realizadas_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aula` ADD CONSTRAINT `Aula_disciplina_realizada_id_fkey` FOREIGN KEY (`disciplina_realizada_id`) REFERENCES `disciplinas_realizadas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avaliacao` ADD CONSTRAINT `Avaliacao_disciplina_realizada_id_fkey` FOREIGN KEY (`disciplina_realizada_id`) REFERENCES `disciplinas_realizadas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_aluno_id_fkey` FOREIGN KEY (`aluno_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_disciplina_realizada_id_fkey` FOREIGN KEY (`disciplina_realizada_id`) REFERENCES `disciplinas_realizadas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `presenca` ADD CONSTRAINT `presenca_matricula_id_fkey` FOREIGN KEY (`matricula_id`) REFERENCES `Matricula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `presenca` ADD CONSTRAINT `presenca_aula_id_fkey` FOREIGN KEY (`aula_id`) REFERENCES `Aula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nota` ADD CONSTRAINT `nota_matricula_id_fkey` FOREIGN KEY (`matricula_id`) REFERENCES `Matricula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nota` ADD CONSTRAINT `nota_avaliacao_id_fkey` FOREIGN KEY (`avaliacao_id`) REFERENCES `Avaliacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CursoToUsuario` ADD CONSTRAINT `_CursoToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CursoToUsuario` ADD CONSTRAINT `_CursoToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DisciplinaToGrade` ADD CONSTRAINT `_DisciplinaToGrade_A_fkey` FOREIGN KEY (`A`) REFERENCES `Disciplina`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DisciplinaToGrade` ADD CONSTRAINT `_DisciplinaToGrade_B_fkey` FOREIGN KEY (`B`) REFERENCES `Grade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
