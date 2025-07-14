import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EscolherClienteFiado() {
  const location = useLocation();
  const navigate = useNavigate();
  const vendaId = location?.state?.vendaId || localStorage.getItem("vendaId");
  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("Renderizando EscolherClienteFiado - vendaId:", vendaId);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const response = await fetch("http://localhost:3000/api/clientesfiado", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar clientes. Status: " + response.status);
        }

        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Erro no fetch clientes:", error);
        setErro("Erro ao carregar clientes");
      }
    }

    fetchClientes();
  }, []);

  const associarCliente = async (clienteId) => {
    setLoading(true);
    setErro("");

    try {
      const response = await fetch(
        `http://localhost:3000/api/vendas/${vendaId}/associarClienteFiado`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ clienteFiadoId: clienteId }),
        }
      );

      if (response.ok) {
        alert("Cliente fiado associado com sucesso!");
        localStorage.removeItem("vendaId");
        navigate("/home");
      } else {
        const errData = await response.json();
        setErro(errData.erro || "Erro ao associar cliente");
      }
    } catch (error) {
      console.error("Erro no associarCliente:", error);
      setErro("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  if (!vendaId) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Venda não especificada. Por favor, volte e selecione novamente.
        </div>
        <button className="btn btn-secondary" onClick={() => navigate("/home")}>
          Voltar para Home
        </button>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{erro}</div>
        <button className="btn btn-secondary" onClick={() => navigate("/home")}>
          Voltar para Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Escolha o Cliente para Fiado</h2>

      <ul className="list-group">
        {clientes.map((cliente) => (
          <li
            key={cliente.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {cliente.nome}
            <button
              className="btn btn-sm btn-primary"
              disabled={loading}
              onClick={() => associarCliente(cliente.id)}
            >
              Selecionar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
