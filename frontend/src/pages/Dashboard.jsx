import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";

function Dashboard() {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const salir = () => {
    cerrarSesion();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Servicios Técnicos</h1>
        <h2>Panel principal</h2>
        <p>
          Bienvenido, <strong>{usuario?.username || "Usuario"}</strong>
        </p>
      </header>

      <nav className="dashboard-nav">
        <Link to="/dashboard">Inicio</Link>
        <Link to="/clientes">Clientes</Link>
        <Link to="/tecnicos">Técnicos</Link>
        <Link to="/servicios">Servicios</Link>
      </nav>

      <main className="dashboard-content">
        {/* Aquí puedes agregar el contenido principal de tu dashboard */}
      </main>

      <button className="btn-logout" onClick={salir} type="button">
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;