const express = require("express");
const router = express.Router();
const clienteFiadoController = require("../controllers/clienteFiadoController");

// Listar todos os clientes fiado
router.get("/", clienteFiadoController.listarClientes);

// Criar novo cliente fiado
router.post("/", clienteFiadoController.criarCliente);

// Buscar cliente fiado por id
router.get("/:id", clienteFiadoController.buscarCliente);

module.exports = router;
