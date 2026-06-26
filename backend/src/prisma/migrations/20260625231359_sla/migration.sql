/*
  Warnings:

  - Added the required column `documentURL` to the `exame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_exame` to the `exame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exame" ADD COLUMN     "documentURL" TEXT NOT NULL,
ADD COLUMN     "nome_exame" TEXT NOT NULL;
