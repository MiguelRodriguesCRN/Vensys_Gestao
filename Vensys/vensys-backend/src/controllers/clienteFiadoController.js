const clienteFiadoService = require("../services/clienteFiadoService");

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await clienteFiadoService.listarClientesFiado();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar clientes fiado" });
  }
};

exports.criarCliente = async (req, res) => {
  const { nome, telefone } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: "Nome é obrigatório" });
  }

  try {
    const cliente = await clienteFiadoService.criarClienteFiado({ nome, telefone });
    res.status(201).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar cliente fiado" });
  }
};

exports.buscarCliente = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const cliente = await clienteFiadoService.buscarClientePorId(id);
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente fiado não encontrado" });
    }
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar cliente fiado" });
  }
};
