import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function VendaCalculadora() {
  const [valor, setValor] = useState("");
  const [valores, setValores] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  // Adiciona um valor à lista
  const adicionarValor = () => {
    const numero = parseFloat(valor);
    if (isNaN(numero)) {
      setErro("Por favor, insira um valor válido.");
      return;
    }
    if (numero <= 0) {
      setErro("O valor deve ser maior que zero.");
      return;
    }
    setValores([...valores, numero]);
    setValor("");
    setErro("");
  };

  // Remove um valor da lista
  const removerValor = (index) => {
    setValores(valores.filter((_, i) => i !== index));
    setErro("");
  };

  // Calcula o total
  const total = valores.reduce((acc, num) => acc + num, 0);

  // Envia a venda para o backend e navega para escolher pagamento
  const handleFinalizarCompra = async () => {
    if (valores.length === 0) {
      setErro("Adicione pelo menos um valor para finalizar a compra.");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const venda = {
      descricao: `Venda com ${valores.length} itens`,
      total,
      fiado: false,
      vendedorId: usuario?.id,
      clienteFiadoId: null,
    };

    try {
      const response = await fetch("http://localhost:3000/api/vendas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(venda),
      });

      if (response.ok) {
        const vendaCriada = await response.json();
        alert("Venda registrada com sucesso!");
        navigate("/escolher-pagamento", { state: { total, vendaId: vendaCriada.id } });
      } else {
        const errorData = await response.json();
        setErro(errorData.erro || "Erro ao registrar venda.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  // Permite adicionar valor ao pressionar Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      adicionarValor();
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 p-md-5 border-0" style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '16px' }}>
        <h2 className="text-center mb-4 fw-bold text-dark">Calculadora de Venda</h2>
        {erro && (
          <div className="alert alert-danger" role="alert">
            {erro}
          </div>
        )}
        <div className="mb-3">
          <label className="form-label fw-semibold">Valor (R$):</label>
          <input
            type="number"
            className="form-control"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite o valor"
            step="0.01"
            min="0"
            autoFocus
          />
        </div>
        <button className="btn btn-primary me-2 mb-3" onClick={adicionarValor}>
          Adicionar Valor
        </button>

        <h4 className="mt-4 fw-semibold">Valores Adicionados:</h4>
        {valores.length === 0 ? (
          <p className="text-muted">Nenhum valor adicionado.</p>
        ) : (
          <ul className="list-group mb-3">
            {valores.map((valor, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                R$ {valor.toFixed(2)}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removerValor(index)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}

        <h3 className="mt-3 fw-bold">Total: R$ {total.toFixed(2)}</h3>

        <div className="d-flex gap-2">
          <button
            className="btn btn-success mt-3 w-100"
            onClick={handleFinalizarCompra}
          >
            Finalizar Compra
          </button>
          <button
            className="btn btn-secondary mt-3 w-100"
            onClick={() => navigate("/home")}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
