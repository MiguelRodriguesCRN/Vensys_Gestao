import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CadastroClienteFiado from "./pages/CadastroClienteFiado";
import VendaCalculadora from "./pages/VendaCalculadora";
import EscolherPagamento from "./pages/EscolherPagamento";
import EscolherClienteFiado from "./pages/EscolherClienteFiado"; // ✅ Importado aqui
import Saida from "./pages/Saida";

export default function App() {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario")) || null
  );
  const [tela, setTela] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    setTela("home");
    navigate("/login");
  };

  const handleCadastroClienteFiadoSucesso = () => {
    setTela("home");
    navigate("/home");
  };

  useEffect(() => {
    console.log("Token:", token, "Usuario:", usuario, "Localização:", location.pathname);
    if (usuario && token && location.pathname === "/") {
      console.log("Redirecionando para /home");
      navigate("/home");
    }
  }, [usuario, token, navigate, location.pathname]);

  return (
    <>
      {token && usuario && (
        <Navbar usuario={usuario} onLogout={logout} setTela={setTela} />
      )}

      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={(usuario) => setUsuario(usuario)} />}
        />
        <Route
          path="/home"
          element={
            token ? (
              <Home usuario={usuario} tela={tela} setTela={setTela} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/cadastroClienteFiado"
          element={
            token ? (
              <CadastroClienteFiado
                onCadastroSucesso={handleCadastroClienteFiadoSucesso}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/VendaCalculadora"
          element={
            token ? (
              <>
                {console.log("Renderizando VendaCalculadora")}
                <VendaCalculadora />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/escolher-pagamento"
          element={
            token ? (
              <EscolherPagamento />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/escolher-cliente-fiado"
          element={
            token ? (
              <EscolherClienteFiado />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/"
          element={<Navigate to={token ? "/home" : "/login"} replace />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/home" : "/login"} replace />}
        />
        <Route path="/Saida" element={<Saida />} />
      </Routes>
    </>
  );
}

