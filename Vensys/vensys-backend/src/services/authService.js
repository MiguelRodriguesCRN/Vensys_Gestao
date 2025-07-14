const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

async function criarUsuario({ nome, email, senha, cargo }) {
  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha: senhaHash,
      cargo, // Deve ser 'ADMIN' ou 'VENDEDOR'
    },
  });

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    cargo: usuario.cargo,
  };
}

async function autenticarUsuario(email, senha) {
  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario) {
    return null;
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    return null;
  }

  const token = jwt.sign(
    { id: usuario.id, cargo: usuario.cargo },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      cargo: usuario.cargo,
    },
  };
}

module.exports = {
  criarUsuario,
  autenticarUsuario,
};
