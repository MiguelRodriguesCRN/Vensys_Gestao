const vendaService = require("../services/vendaService");

exports.criarVenda = async (req, res) => {
  const { descricao, total, fiado, vendedorId, clienteFiadoId } = req.body;

  try {
    const venda = await vendaService.criarVenda({
      descricao,
      total,
      fiado,
      vendedorId,
      clienteFiadoId,
    });

    res.status(201).json(venda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao registrar venda" });
  }
};

exports.atualizarPagamento = async (req, res) => {
  const vendaId = parseInt(req.params.id);
  const { formaPagamento } = req.body;

  if (!["DINHEIRO", "CARTAO", "FIADO"].includes(formaPagamento)) {
    return res.status(400).json({ erro: "Forma de pagamento inválida." });
  }

  try {
    const vendaAtualizada = await vendaService.atualizarPagamento(vendaId, formaPagamento);
    res.json(vendaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar pagamento." });
  }
};

exports.associarClienteFiado = async (req, res) => {
  const vendaId = parseInt(req.params.id);
  const { clienteFiadoId } = req.body;

  try {
    const vendaAtualizada = await vendaService.associarClienteFiado(vendaId, clienteFiadoId);
    res.json(vendaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao associar cliente fiado." });
  }
};
