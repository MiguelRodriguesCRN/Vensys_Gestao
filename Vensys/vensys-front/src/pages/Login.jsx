import React, { useState } from "react";
import api from "../services/api"; // seu axios configurado
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro(null);

    try {
      const response = await api.post("/usuarios/login", { email, senha });
      const { token, usuario } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      if (onLogin) {
        onLogin(usuario, token);
      }

      navigate("/home");
    } catch (err) {
      setErro(err.response?.data?.erro || "Credenciais inválidas");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow-lg p-4 p-md-5 border-0"
        style={{ maxWidth: "450px", width: "100%", borderRadius: "16px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-dark">Bem-vindo de volta</h2>
        <p className="text-center text-muted mb-4">
          Faça login para acessar sua conta
        </p>

        {erro && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {erro}
            <button
              type="button"
              className="btn-close"
              onClick={() => setErro(null)}
              aria-label="Close"
            ></button>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-medium text-dark">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control form-control-lg border-1 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seuemail@exemplo.com"
              autoComplete="username"
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label htmlFor="senha" className="form-label fw-medium text-dark">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              className="form-control form-control-lg border-1 shadow-sm"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-3 fw-semibold"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(90deg, #007bff, #0056b3)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 123, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
