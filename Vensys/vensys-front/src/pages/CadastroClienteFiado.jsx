import React, { useState } from "react";
import api from "../services/api";

export default function CadastroClienteFiado({ onCadastroSucesso }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    if (!nome.trim()) {
      setErro("O nome é obrigatório.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/clientesfiado", { nome, telefone }); // Ajuste a URL conforme sua API
      setSucesso("Cliente fiado cadastrado com sucesso!");
      setNome("");
      setTelefone("");

      if (onCadastroSucesso) {
        onCadastroSucesso();
      }
    } catch (err) {
      setErro(
        err.response?.data?.erro || "Erro ao cadastrar cliente fiado. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h2>Cadastrar Cliente Fiado</h2>

      {erro && <div className="alert alert-danger">{erro}</div>}
      {sucesso && <div className="alert alert-success">{sucesso}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="nome"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">
            Telefone
          </label>
          <input
            type="tel"
            id="telefone"
            className="form-control"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
