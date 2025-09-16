-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(11) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `senha` VARCHAR(60) NOT NULL,
    `role` ENUM('administrador', 'aluno', 'professor') NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    UNIQUE INDEX `usuarios_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disciplinas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `quantidade_aulas` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `versao` INTEGER NOT NULL,
    `curso_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matriculas_cursos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_inicio` DATETIME(3) NOT NULL,
    `data_fim` DATETIME(3) NULL,
    `status` ENUM('cursando', 'finalizado', 'trancado', 'abandonado') NOT NULL,
    `aluno_id` INTEGER NOT NULL,
    `grade_id` INTEGER NOT NULL,

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
CREATE TABLE `aulas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(100) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,
    `disciplina_realizada_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `avaliacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `valor` INTEGER NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `disciplina_realizada_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matriculas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nota_final` INTEGER NULL,
    `presenca_final` INTEGER NULL,
    `status` ENUM('cursando', 'aprovado', 'reprovado', 'abandonado') NOT NULL,
    `aluno_id` INTEGER NOT NULL,
    `disciplina_realizada_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presencas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `presente` BOOLEAN NOT NULL,
    `matricula_id` INTEGER NOT NULL,
    `aula_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor_obtido` DECIMAL(4, 2) NOT NULL,
    `matricula_id` INTEGER NOT NULL,
    `avaliacao_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DisciplinaToGrade` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DisciplinaToGrade_AB_unique`(`A`, `B`),
    INDEX `_DisciplinaToGrade_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matriculas_cursos` ADD CONSTRAINT `matriculas_cursos_aluno_id_fkey` FOREIGN KEY (`aluno_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matriculas_cursos` ADD CONSTRAINT `matriculas_cursos_grade_id_fkey` FOREIGN KEY (`grade_id`) REFERENCES `grades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `_DisciplinaToGrade` ADD CONSTRAINT `_DisciplinaToGrade_A_fkey` FOREIGN KEY (`A`) REFERENCES `disciplinas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DisciplinaToGrade` ADD CONSTRAINT `_DisciplinaToGrade_B_fkey` FOREIGN KEY (`B`) REFERENCES `grades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
