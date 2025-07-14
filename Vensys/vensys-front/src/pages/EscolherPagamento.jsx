import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EscolherPagamento() {
  const { state } = useLocation();
  const { total, vendaId } = state || { total: 0, vendaId: null };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const formaPagamentoMap = {
    Dinheiro: "DINHEIRO",
    Cartão: "CARTAO",
    Fiado: "FIADO",
  };

  const handlePagamento = async (metodoAmigavel) => {
    if (metodoAmigavel === "Fiado") {
      localStorage.setItem("vendaId", vendaId);  // ✅ Salva no localStorage
      navigate("/escolher-cliente-fiado", { state: { vendaId } });
      return;
    }

    const metodo = formaPagamentoMap[metodoAmigavel];
    setErro("");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/vendas/${vendaId}/pagamento`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ formaPagamento: metodo }),
      });

      if (response.ok) {
        alert(`Pagamento de R$ ${total.toFixed(2)} com ${metodoAmigavel} registrado com sucesso!`);
        navigate("/home");
      } else {
        const errorData = await response.json();
        setErro(errorData.erro || "Erro ao registrar pagamento.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 p-md-5 border-0" style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '16px' }}>
        <h2 className="text-center mb-4 fw-bold text-dark">Escolher Forma de Pagamento</h2>
        <h3 className="mb-4">Total: R$ {total.toFixed(2)}</h3>

        {erro && (
          <div className="alert alert-danger" role="alert">
            {erro}
          </div>
        )}

        <div className="d-flex flex-column gap-3">
          <button className="btn btn-primary py-3" onClick={() => handlePagamento("Dinheiro")} disabled={loading}>
            Pagar com Dinheiro
          </button>
          <button className="btn btn-primary py-3" onClick={() => handlePagamento("Cartão")} disabled={loading}>
            Pagar com Cartão
          </button>
          <button className="btn btn-primary py-3" onClick={() => handlePagamento("Fiado")} disabled={loading}>
            Pagar com Fiado
          </button>
        </div>
      </div>
    </div>
  );
}
