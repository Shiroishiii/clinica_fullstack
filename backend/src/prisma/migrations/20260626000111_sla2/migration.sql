/*
  Warnings:

  - Added the required column `laboratorio` to the `exame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exame" ADD COLUMN     "laboratorio" TEXT NOT NULL,
ALTER COLUMN "valor" DROP NOT NULL,
ALTER COLUMN "descricao" DROP NOT NULL;
