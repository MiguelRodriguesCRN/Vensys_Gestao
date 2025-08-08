require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Importação das rotas
const userRoutes = require("./routes/userRoutes");
const vendaRoutes = require("./routes/vendaRoutes");
const clienteFiadoRoutes = require("./routes/clienteFiadoRoutes");  // ← Adicionado aqui
const saidaRoutes = require("./routes/saidaRoutes");

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api/usuarios", userRoutes);
app.use("/api/vendas", vendaRoutes);
app.use("/api/clientesfiado", clienteFiadoRoutes);  // ← Adicionado aqui
app.use("/api/saidas", saidaRoutes);

// Exemplo de rota protegida (caso queira futuramente)
app.get("/api/protegido", (req, res) => {
  res.json({ mensagem: "Você está autenticado!" });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// Middleware para tratamento de erros gerais
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
