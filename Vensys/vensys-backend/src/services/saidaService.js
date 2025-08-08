const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function criarSaida({ valor, observacao, usuarioId }) {
    return await prisma.saida.create({

        data: {

            valor,
            observacao,
            usuarioId,

        },

    });
}

async function listarSaidasPorPeriodo(inicio, fim) {
    return await prisma.saida.findMany({

        where: {

            criadoEm: {
                gte: inicio,
                lte: fim,
            },

    },

        include: {
            usuario: true,
        },

    });
}

module.exports = {
    criarSaida,
    listarSaidasPorPeriodo,
};
