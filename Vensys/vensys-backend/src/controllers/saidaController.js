const saidaService = require("../services/saidaService");
const PDFDocument = require("pdfkit");

exports.criarSaida = async (req, res) => {

    const { valor, observacao, usuarioId } = req.body;

    try {

        const saida = await saidaService.criarSaida({ valor, observacao, usuarioId });
        res.status(201).json(saida);

    } catch (error) {

        console.error(error);
        res.status(500).json({ erro: "Erro ao criar saída." });

    }
};

exports.gerarRelatorioPDF = async (req, res) => {

    const { periodo } = req.query; //? O período do relatório pode ser filtrado por dia ou mes através na requisição com ?periodo=dia ou mes

    let inicio, fim;
    const hoje = new Date();

    if (periodo === "dia") {
        inicio = new Date(hoje.setHours(0, 0, 0, 0));
        fim = new Date(hoje.setHours(23, 59, 59, 999));
    } 

    else if (periodo === "mes") {
        inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0, 23, 59, 59, 999);
    } 

    else {
        return res.status(400).json({ erro: "Período inválido." });
    }

    try {

        const saidas = await saidaService.listarSaidasPorPeriodo(inicio, fim);

        //* Gera o documento em PDF
        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        doc.pipe(res);

        doc.fontSize(18).text(`Relatório de Saídas - ${periodo.toUpperCase()}`, { underline: true, align:"center" });
        doc.moveDown(1);

        saidas.forEach((saida) => {

            doc.fontSize(12)
            .text(`ID: ${saida.id} | Valor: R$ ${saida.valor.toFixed(2)} | Observação: ${saida.observacao || "-"} | Usuário: ${saida.usuario.nome} | Criado em: ${saida.criadoEm} \n \n`, { characterSpacing:1, columns:1 } );
        });

        doc.end();

    } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao gerar relatório PDF." });
    }

};
