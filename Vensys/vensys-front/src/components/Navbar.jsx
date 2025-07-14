import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar({ onLogout, usuario, setTela }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-primary shadow-sm">
      <div className="container-fluid px-4">
        <span className="navbar-brand fw-bold text-white">Vensys: Solução inteligente para suas vendas.</span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="ms-auto d-flex align-items-center">

            {/* Botão Cadastrar Cliente Fiado — só para ADMIN */}
            {usuario.cargo === "ADMIN" && (
              <button
                className="btn btn-outline-light me-2 fw-medium"
                onClick={() => {
                  setTela("cadastroClienteFiado");
                  navigate("/cadastroClienteFiado");
                }}
                style={{
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <i className="bi bi-person-plus me-1"></i> Cadastrar Cliente Fiado
              </button>
            )}

            {/* Seus outros botões */}
            <button
              className="btn btn-outline-light me-2 fw-medium"
              onClick={() => {
                setTela("home");
                navigate("/home");
              }}
              style={{
                borderRadius: '8px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '';
              }}
            >
              <i className="bi bi-house-door me-1"></i> Home
            </button>

            {/* ... outros botões */}

            <span className="navbar-text text-white me-3 fw-medium">
              {usuario.cargo === "VENDEDOR" ? "Vendedor" : "Admin"}: {usuario.nome}
            </span>

            <button
              className="btn btn-outline-danger fw-medium"
              onClick={onLogout}
              style={{
                borderRadius: '8px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '';
              }}
            >
              <i className="bi bi-box-arrow-right me-1"></i> Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
