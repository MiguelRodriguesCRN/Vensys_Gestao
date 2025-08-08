import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Saida() {

    const [valor, setValor] = useState("");
    const [valores, setValores] = useState([]);
    const [observacao, setObservacao] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const adicionarValor = () => {

        const numero = parseFloat(valor);
        if (isNaN(numero) || numero <= 0) {
            setErro("Insira um valor válido e maior que zero.");
            return;
        }

        setValores([...valores, numero]);
        setValor("");
        setErro("");

    };

    const removerValor = (index) => {
    setValores(valores.filter((_, i) => i !== index));
    setErro("");
    };

    const total = valores.reduce((acc, num) => acc + num, 0);

    const handleFinalizarSaida = async () => {

        if (valores.length === 0) {
            setErro("Adicione pelo menos um valor para registrar a saída.");
            return;
        }

    const saida = {
        valor: total,
        observacao,
        usuarioId: usuario?.id,
    };

    try {

            const response = await fetch("http://localhost:3000/api/saidas", {

                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(saida),

            });

            if (response.ok) {
                alert("Saída registrada com sucesso!");
                navigate("/home");
            } 

            else {
                const errorData = await response.json();
                setErro(errorData.erro || "Erro ao registrar saída.");
            }

        } catch (error) {
        console.error("Erro:", error);
        setErro("Erro ao conectar com o servidor.");
        }

    };

    const gerarPDF = (periodo) => {
        window.open(`http://localhost:3000/api/saidas/relatorio?periodo=${periodo}`, "_blank");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
        e.preventDefault();
        adicionarValor();
        }
    };

    return (

        <div className="container mt-5">
        <div
            className="card shadow-lg p-4 p-md-5 border-0"
            style={{ maxWidth: "600px", margin: "0 auto", borderRadius: "16px" }}
        >
            <h2 className="text-center mb-4 fw-bold text-dark">Registrar Saída</h2>
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

            <div className="mb-3">
            <label className="form-label fw-semibold">Observação:</label>
            <textarea
                className="form-control"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                placeholder="Digite uma observação"
                rows={2}
            />
            </div>

            <h4 className="mt-4 fw-semibold">Valores Adicionados:</h4>
            {valores.length === 0 ? (
            <p className="text-muted">Nenhum valor adicionado.</p>
            ) : (
            <ul className="list-group mb-3">
                {valores.map((valor, index) => (
                <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                >
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

            <div className="d-flex flex-column gap-2 mt-4">
            <button
                className="btn btn-success"
                onClick={handleFinalizarSaida}
            >
                Finalizar Saída
            </button>
            <button
                className="btn btn-secondary"
                onClick={() => navigate("/home")}
            >
                Voltar
            </button>
            </div>

            <div className="mt-4">
            <h5 className="fw-semibold mb-2">Gerar Relatório (PDF)</h5>
            <div className="d-flex flex-column gap-2">
                <button
                className="btn btn-outline-primary"
                onClick={() => gerarPDF("dia")}
                >
                Gerar PDF do Dia
                </button>
                <button
                className="btn btn-outline-primary"
                onClick={() => gerarPDF("mes")}
                >
                Gerar PDF do Mês
                </button>
            </div>
            </div>
        </div>
        </div>

);

}
