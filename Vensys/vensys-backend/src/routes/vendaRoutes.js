const express = require("express");
const router = express.Router();
const vendaController = require("../controllers/vendaController");

router.post("/", vendaController.criarVenda);

// Nova rota para atualizar forma de pagamento
router.put("/:id/pagamento", vendaController.atualizarPagamento);
// Nova rota para associar cliente fiado
router.put("/:id/associarClienteFiado", vendaController.associarClienteFiado);

module.exports = router;
