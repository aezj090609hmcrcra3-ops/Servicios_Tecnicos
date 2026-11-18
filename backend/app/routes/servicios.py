from flask import Blueprint, jsonify, request
from app.config.conexion import conectar

servicios_bp = Blueprint("servicios", __name__)

@servicios_bp.route("/api/servicios", methods=["GET"])
def obtener_servicios():
    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500
    cursor = None
    try:
        cursor = conexion.cursor(dictionary=True)
        consulta = """
        SELECT s.id, s.descripcion, s.estado, s.fecha,
               s.cliente_id, c.nombre AS cliente_nombre,
               s.tecnico_id, t.nombre AS tecnico_nombre
        FROM servicio s
        INNER JOIN clientes c ON s.cliente_id = c.id
        INNER JOIN tecnico t ON s.tecnico_id = t.id
        ORDER BY s.id DESC
        """
        cursor.execute(consulta)
        return jsonify({"success": True, "servicios": cursor.fetchall()}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor: 
            cursor.close()
        conexion.close()

# ==========================================
# 10. GET - Catálogo de Clientes (Sección 10)
# ==========================================
@servicios_bp.route("/api/clientes/catalogo", methods=["GET"])
def catalogo_clientes():
    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500
    cursor = None
    try:
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT id, nombre FROM clientes ORDER BY nombre")
        return jsonify({"success": True, "clientes": cursor.fetchall()}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor: 
            cursor.close()
        conexion.close()

# ==========================================
# 11. GET - Catálogo de Técnicos (Sección 11)
# ==========================================
@servicios_bp.route("/api/tecnicos/catalogo", methods=["GET"])
def catalogo_tecnicos():
    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500
    cursor = None
    try:
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT id, nombre FROM tecnico ORDER BY nombre")
        return jsonify({"success": True, "tecnicos": cursor.fetchall()}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor: 
            cursor.close()
        conexion.close()

# ==========================================
# 12. POST - Crear Servicio (Sección 12)
# ==========================================
@servicios_bp.route("/api/servicios", methods=["POST"])
def crear_servicio():
    datos = request.get_json(silent=True)
    if not isinstance(datos, dict):
        return jsonify({"success": False, "message": "JSON válido requerido"}), 400

    cliente_id = datos.get("cliente_id")
    tecnico_id = datos.get("tecnico_id")
    descripcion = datos.get("descripcion")
    estado = datos.get("estado", "Pendiente")
    fecha = datos.get("fecha")

    if not cliente_id or not tecnico_id or not descripcion:
        return jsonify({"success": False, "message": "Cliente, técnico y descripción son obligatorios"}), 400

    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500
    cursor = None
    try:
        cursor = conexion.cursor()
        consulta = """
        INSERT INTO servicio (cliente_id, tecnico_id, descripcion, estado, fecha)
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(consulta, (cliente_id, tecnico_id, descripcion.strip(), estado, fecha))
        conexion.commit()
        return jsonify({"success": True, "message": "Servicio creado", "id": cursor.lastrowid}), 201
    except Exception as e:
        conexion.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor: 
            cursor.close()
        conexion.close()

# ==========================================
# 13. PUT - Actualizar Servicio (Sección 13)
# ==========================================
@servicios_bp.route("/api/servicios/<int:servicio_id>", methods=["PUT"])
def actualizar_servicio(servicio_id):
    datos = request.get_json(silent=True)
    if not isinstance(datos, dict):
        return jsonify({"success": False, "message": "JSON válido requerido"}), 400

    cliente_id = datos.get("cliente_id")
    tecnico_id = datos.get("tecnico_id")
    descripcion = datos.get("descripcion")
    estado = datos.get("estado")
    fecha = datos.get("fecha")

    if not cliente_id or not tecnico_id or not descripcion:
        return jsonify({"success": False, "message": "Campos obligatorios faltantes"}), 400

    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500
    cursor = None
    try:
        cursor = conexion.cursor()
        consulta = """
        UPDATE servicio
        SET cliente_id = %s, tecnico_id = %s, descripcion = %s, estado = %s, fecha = %s
        WHERE id = %s
        """
        cursor.execute(consulta, (cliente_id, tecnico_id, descripcion.strip(), estado, fecha, servicio_id))
        conexion.commit()
        if cursor.rowcount == 0:
            return jsonify({"success": False, "message": "Servicio no encontrado"}), 404
        return jsonify({"success": True, "message": "Servicio actualizado"}), 200
    except Exception as e:
        conexion.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor: 
            cursor.close()
        conexion.close()

# ==========================================
# 14. DELETE - Eliminar Servicio (Sección 14)
# ==========================================
@servicios_bp.route("/api/servicios/<int:servicio_id>", methods=["DELETE"])
def eliminar_servicio(servicio_id):
    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500
    cursor = None
    try:
        cursor = conexion.cursor()
        cursor.execute("DELETE FROM servicio WHERE id = %s", (servicio_id,))
        conexion.commit()
        if cursor.rowcount == 0:
            return jsonify({"success": False, "message": "Servicio no encontrado"}), 404
        return jsonify({"success": True, "message": "Servicio eliminado"}), 200
    except Exception as e:
        conexion.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor: 
            cursor.close()
        conexion.close()