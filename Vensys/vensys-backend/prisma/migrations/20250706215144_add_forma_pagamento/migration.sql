-- CreateEnum
CREATE TYPE "FormaPagamento" AS ENUM ('DINHEIRO', 'CARTAO', 'FIADO');

-- AlterTable
ALTER TABLE "Venda" ADD COLUMN     "formaPagamento" "FormaPagamento" NOT NULL DEFAULT 'DINHEIRO';
