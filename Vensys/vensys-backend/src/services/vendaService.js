const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function criarVenda({ descricao, total, fiado, vendedorId, clienteFiadoId }) {
  return await prisma.venda.create({
    data: {
      descricao,
      total,
      fiado: fiado || false,
      vendedorId,
      clienteFiadoId: fiado ? clienteFiadoId : null,
      formaPagamento: "DINHEIRO"  // valor padrão
    },
  });
}

async function atualizarPagamento(vendaId, formaPagamento) {
  return await prisma.venda.update({
    where: { id: vendaId },
    data: { formaPagamento },
  });
}

async function associarClienteFiado(vendaId, clienteFiadoId) {
  return await prisma.venda.update({
    where: { id: vendaId },
    data: { 
      clienteFiadoId,
      formaPagamento: "FIADO", // Já define forma de pagamento como FIADO
      fiado: true, // Marca como venda fiada
    },
  });
}

module.exports = {
  criarVenda,
  atualizarPagamento,
  associarClienteFiado,
};
