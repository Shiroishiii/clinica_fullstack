/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `paciente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "paciente" ADD COLUMN     "alergias" TEXT,
ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "contato_emergencia" TEXT,
ADD COLUMN     "convenio" TEXT,
ADD COLUMN     "cuidados_especiais" TEXT,
ADD COLUMN     "estado" TEXT,
ADD COLUMN     "estado_civil" TEXT,
ADD COLUMN     "naturalidade" TEXT,
ADD COLUMN     "numero" TEXT,
ADD COLUMN     "numero_convenio" TEXT,
ADD COLUMN     "referencia" TEXT,
ADD COLUMN     "rg" TEXT,
ADD COLUMN     "rua" TEXT,
ADD COLUMN     "validade_convenio" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "paciente_cpf_key" ON "paciente"("cpf");
