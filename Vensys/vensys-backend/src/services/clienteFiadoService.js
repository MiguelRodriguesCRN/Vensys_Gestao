const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function listarClientesFiado() {
  return await prisma.clienteFiado.findMany({
    orderBy: { nome: "asc" },
  });
}

async function criarClienteFiado({ nome, telefone }) {
  return await prisma.clienteFiado.create({
    data: { nome, telefone },
  });
}

async function buscarClientePorId(id) {
  return await prisma.clienteFiado.findUnique({
    where: { id },
  });
}

module.exports = {
  listarClientesFiado,
  criarClienteFiado,
  buscarClientePorId,
};
