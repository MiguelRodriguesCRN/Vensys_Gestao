const express = require("express");
const router = express.Router();
const saidaController = require("../controllers/saidaController");

router.post("/", saidaController.criarSaida);

// Rota que gera o relatório em PDF
router.get("/relatorio", saidaController.gerarRelatorioPDF);

module.exports = router;
