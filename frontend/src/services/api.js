const API_URL = "http://127.0.0.1:5000";
const CLIENTES_URL = `${API_URL}/api/clientes`;
const TECNICOS_URL = `${API_URL}/api/tecnicos`;
const SERVICIOS_URL = `${API_URL}/api/servicios`;

// --- Servicio de Autenticación ---
export async function login(username, password) {
  try {
    const respuesta = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const datos = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      datos,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      datos: { mensaje: "Error de red o el servidor no responde", error: error.message },
    };
  }
}

// --- Servicios de Clientes (CRUD) ---
export async function obtenerClientes() {
  try {
    const respuesta = await fetch(CLIENTES_URL);
    const datos = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      datos,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      datos: { mensaje: "Error de red o el servidor no responde", error: error.message },
    };
  }
}

export async function crearCliente(cliente) {
  try {
    const respuesta = await fetch(CLIENTES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });

    const datos = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      datos,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      datos: { mensaje: "Error de red o el servidor no responde", error: error.message },
    };
  }
}

export async function actualizarCliente(id, cliente) {
  try {
    const respuesta = await fetch(`${CLIENTES_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });

    const datos = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      datos,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      datos: { mensaje: "Error de red o el servidor no responde", error: error.message },
    };
  }
}

export async function eliminarCliente(id) {
  try {
    const respuesta = await fetch(`${CLIENTES_URL}/${id}`, {
      method: "DELETE",
    });

    const datos = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      datos,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      datos: { mensaje: "Error de red o el servidor no responde", error: error.message },
    };
  }
}

// --- Servicios de Técnicos (CRUD) ---
export async function obtenerTecnicos() {
  try {
    const respuesta = await fetch(TECNICOS_URL);
    const datos = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      datos,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      datos: { mensaje: "Error de red o el servidor no responde", error: error.message },
    };
  }
}

export async function crearTecnico(tecnico) {
  try {
    const respuesta = await fetch(TECNICOS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tecnico),
    });

    const datos = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      datos,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      datos: { mensaje: "Error de red o el servidor no responde", error: error.message },
    };
  }
}

export async function actualizarTecnico(id, tecnico) {
  try {
    const respuesta = await fetch(`${TECNICOS_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tecnico),
    });

    const datos = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      datos,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      datos: { mensaje: "Error de red o el servidor no responde", error: error.message },
    };
  }
}

export async function eliminarTecnico(id) {
  try {
    const respuesta = await fetch(`${TECNICOS_URL}/${id}`, {
      method: "DELETE",
    });

    const datos = await respuesta.json();

    return {
      ok: respuesta.ok,
      status: respuesta.status,
      datos,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      datos: { mensaje: "Error de red o el servidor no responde", error: error.message },
    };
  }
}

// --- Servicios de Servicios Técnicos y Catálogos ---
export async function obtenerServicios() {
  try {
    const r = await fetch(SERVICIOS_URL);
    const datos = await r.json();
    return { ok: r.ok, datos };
  } catch (error) {
    return { ok: false, datos: { mensaje: error.message } };
  }
}

export async function obtenerClientesCatalogo() {
  try {
    const r = await fetch(`${API_URL}/api/clientes/catalogo`);
    const datos = await r.json();
    return { ok: r.ok, datos };
  } catch (error) {
    return { ok: false, datos: { mensaje: error.message } };
  }
}

export async function obtenerTecnicosCatalogo() {
  try {
    const r = await fetch(`${API_URL}/api/tecnicos/catalogo`);
    const datos = await r.json();
    return { ok: r.ok, datos };
  } catch (error) {
    return { ok: false, datos: { mensaje: error.message } };
  }
}

export async function crearServicio(servicio) {
  try {
    const r = await fetch(SERVICIOS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(servicio)
    });
    const datos = await r.json();
    return { ok: r.ok, datos };
  } catch (error) {
    return { ok: false, datos: { mensaje: error.message } };
  }
}

export async function actualizarServicio(id, servicio) {
  try {
    const r = await fetch(`${SERVICIOS_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(servicio)
    });
    const datos = await r.json();
    return { ok: r.ok, datos };
  } catch (error) {
    return { ok: false, datos: { mensaje: error.message } };
  }
}

export async function eliminarServicio(id) {
  try {
    const r = await fetch(`${SERVICIOS_URL}/${id}`, { 
      method: "DELETE" 
    });
    const datos = await r.json();
    return { ok: r.ok, datos };
  } catch (error) {
    return { ok: false, datos: { mensaje: error.message } };
  }
}