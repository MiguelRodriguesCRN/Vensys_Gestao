import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home({ usuario, tela, setTela }) {
  const navigate = useNavigate();

  const handleRealizarVenda = () => {
    console.log("Botão Realizar Venda clicado"); // Log para verificar clique
    console.log("Navegando para /VendaCalculadora"); // Log para verificar navegação
    navigate("/VendaCalculadora");
  };

  const handleRealizarSaida = () => {
    console.log("Botão Realizar Saida clicado");
    console.log("Navegando para '/Saida'");
    navigate("/Saida");
  };

  const handleCadastroClienteFiado = () => {
    console.log("Botão Cadastrar Cliente Fiado clicado"); // Log para depuração
    if (!usuario) {
      alert("Você precisa estar logado para cadastrar um cliente fiado!");
      navigate("/login");
      return;
    }
    setTela("cadastroClienteFiado");
    navigate("/cadastroClienteFiado");
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <header className="mb-5">
        <h1 className="text-center fw-bold text-dark">Vensys</h1>
        <p className="text-center text-muted">Gerencie suas vendas de forma simples e eficiente</p>
      </header>

      {/* Main Content */}
      <div className="card shadow-lg p-4 p-md-5 border-0" style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '16px' }}>
        <h2 className="text-center mb-4 fw-bold text-dark">Bem-vindo ao Vensys</h2>
        <p className="text-center text-muted mb-4">
          {usuario ? `Olá, ${usuario.nome}! Escolha uma opção abaixo para começar.` : "Faça login para acessar as funcionalidades."}
        </p>

        {/* Navigation Buttons */}
        <div className="d-flex flex-column gap-3">
          <button
            onClick={handleRealizarVenda}
            className="btn btn-primary py-3 fw-semibold"
            style={{
              borderRadius: '10px',
              background: 'linear-gradient(90deg, #007bff, #0056b3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Realizar Venda
          </button>
          {usuario && usuario.cargo === "ADMIN" && (
            <>
              <button
                onClick={handleRealizarSaida}
                className="btn btn-outline-primary py-3 fw-semibold"
                style={{ borderRadius: '10px' }}
              >
                Realizar Saida
              </button>
              <button
                onClick={handleCadastroClienteFiado}
                className="btn btn-outline-primary py-3 fw-semibold"
                style={{ borderRadius: '10px' }}
              >
                Cadastrar Cliente Fiado
              </button>
              <button
                onClick={handleCadastroClienteFiado}
                className="btn btn-outline-primary py-3 fw-semibold"
                style={{ borderRadius: '10px' }}
              >
                Lista de Fiados
              </button>
              <button
                onClick={() => {
                  console.log("Botão Ver Relatórios clicado"); // Log para depuração
                  navigate("/relatorios");
                }}
                className="btn btn-outline-primary py-3 fw-semibold"
                style={{ borderRadius: '10px' }}
              >
                Ver Relatórios
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-5 text-center text-muted">
        <p>© 2025 Vensys. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;