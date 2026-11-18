import { useEffect, useState } from "react";
import {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from "../services/api";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  // Campos del formulario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const cargarClientes = async () => {
    try {
      const res = await obtenerClientes();
      if (res.ok && res.datos.success) {
        setClientes(res.datos.clientes);
      } else {
        setMensaje(res.datos.message || "Error al cargar clientes");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const limpiarFormulario = () => {
    setEditandoId(null);
    setUsername("");
    setPassword("");
    setNombre("");
    setEmail("");
    setTelefono("");
    setDireccion("");
  };

  const guardar = async (e) => {
    e.preventDefault();
    setMensaje("");

    const clienteData = { nombre, email, telefono, direccion, username, password };

    const res = editandoId
      ? await actualizarCliente(editandoId, clienteData)
      : await crearCliente(clienteData);

    setMensaje(res.datos.message || "Solicitud procesada");

    if (res.ok) {
      limpiarFormulario();
      await cargarClientes();
    }
  };

  const prepararEdicion = (cliente) => {
    setEditandoId(cliente.id);
    setNombre(cliente.nombre);
    setEmail(cliente.email);
    setTelefono(cliente.telefono || "");
    setDireccion(cliente.direccion || "");
    setUsername(cliente.username || "");
    setPassword(""); // Se deja vacío por seguridad
  };

  const borrar = async (id) => {
    if (!window.confirm("¿Eliminar este cliente de prueba?")) return;

    const res = await eliminarCliente(id);
    setMensaje(res.datos.message || "Solicitud procesada");
    if (res.ok) {
      await cargarClientes();
    }
  };

  return (
    <div className="dashboard" style={{ padding: "20px" }}>
      <h1>Gestión de Clientes</h1>

      {mensaje && <p style={{ color: "blue", fontWeight: "bold" }}>{mensaje}</p>}

      {/* Formulario Crear / Editar */}
      <form onSubmit={guardar} style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <h3>{editandoId ? "Editar Cliente" : "Registrar Nuevo Cliente"}</h3>
        
        <input
          type="text"
          placeholder="Nombre completo *"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nombre de usuario *"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={!!editandoId} // Deshabilitado durante edición
          required={!editandoId}
        />
        {!editandoId && (
          <input
            type="password"
            placeholder="Contraseña *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit">{editandoId ? "Actualizar" : "Guardar"}</button>
          {editandoId && (
            <button type="button" onClick={limpiarFormulario}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Tabla de registros */}
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.username}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono || "N/A"}</td>
                <td>{cliente.direccion || "N/A"}</td>
                <td>
                  <button onClick={() => prepararEdicion(cliente)}>Editar</button>
                  {" "}
                  <button onClick={() => borrar(cliente.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No hay clientes registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;