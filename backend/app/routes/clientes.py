from flask import Blueprint, jsonify, request
from app.config.conexion import conectar
import hashlib

clientes_bp = Blueprint("clientes", __name__)


# --- GET: Consultar Clientes ---
@clientes_bp.route("/api/clientes", methods=["GET"])
def obtener_clientes():
    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500

    cursor = None
    try:
        cursor = conexion.cursor(dictionary=True)
        cursor.execute(
            "SELECT id, username, nombre, email, telefono, direccion, creado_en FROM clientes"
        )
        clientes = cursor.fetchall()
        return jsonify({"success": True, "clientes": clientes}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()


# --- POST: Crear Cliente ---
@clientes_bp.route("/api/clientes", methods=["POST"])
def crear_cliente():
    datos = request.get_json(silent=True)
    if not isinstance(datos, dict):
        return jsonify({"success": False, "message": "JSON válido requerido"}), 400

    username = datos.get("username")
    password = datos.get("password")
    nombre = datos.get("nombre")
    email = datos.get("email")
    telefono = datos.get("telefono", "")
    direccion = datos.get("direccion", "")

    if not isinstance(nombre, str) or not nombre.strip():
        return jsonify({"success": False, "message": "El nombre es obligatorio"}), 400
    if not isinstance(username, str) or not username.strip():
        return jsonify({"success": False, "message": "El username es obligatorio"}), 400
    if not isinstance(password, str) or not password.strip():
        return jsonify({"success": False, "message": "La contraseña es obligatoria"}), 400
    if not isinstance(email, str) or not email.strip():
        return jsonify({"success": False, "message": "El email es obligatorio"}), 400

    password_hash = hashlib.sha256(password.strip().encode("utf-8")).hexdigest()

    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500

    cursor = None
    try:
        cursor = conexion.cursor()
        query = """
            INSERT INTO clientes (username, password, nombre, email, telefono, direccion)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        valores = (
            username.strip(),
            password_hash,
            nombre.strip(),
            email.strip(),
            telefono.strip() if isinstance(telefono, str) else "",
            direccion.strip() if isinstance(direccion, str) else "",
        )
        cursor.execute(query, valores)
        conexion.commit()
        return jsonify({"success": True, "message": "Cliente creado", "id": cursor.lastrowid}), 201
    except Exception as e:
        if conexion:
            conexion.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()


# --- PUT: Actualizar Cliente ---
@clientes_bp.route("/api/clientes/<int:cliente_id>", methods=["PUT"])
def actualizar_cliente(cliente_id):
    datos = request.get_json(silent=True)
    if not isinstance(datos, dict):
        return jsonify({"success": False, "message": "JSON válido requerido"}), 400

    nombre = datos.get("nombre")
    email = datos.get("email")
    telefono = datos.get("telefono", "")
    direccion = datos.get("direccion", "")

    if not isinstance(nombre, str) or not nombre.strip():
        return jsonify({"success": False, "message": "El nombre es obligatorio"}), 400

    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500

    cursor = None
    try:
        cursor = conexion.cursor()
        query = """
            UPDATE clientes 
            SET nombre=%s, email=%s, telefono=%s, direccion=%s 
            WHERE id=%s
        """
        valores = (
            nombre.strip(),
            email.strip() if isinstance(email, str) else "",
            telefono.strip() if isinstance(telefono, str) else "",
            direccion.strip() if isinstance(direccion, str) else "",
            cliente_id,
        )
        cursor.execute(query, valores)
        conexion.commit()

        if cursor.rowcount == 0:
            return jsonify({"success": False, "message": "No encontrado o sin cambios"}), 404

        return jsonify({"success": True, "message": "Cliente actualizado"}), 200
    except Exception as e:
        if conexion:
            conexion.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()


# --- DELETE: Eliminar Cliente ---
@clientes_bp.route("/api/clientes/<int:cliente_id>", methods=["DELETE"])
def eliminar_cliente(cliente_id):
    conexion = conectar()
    if conexion is None:
        return jsonify({"success": False, "message": "Sin conexión a BD"}), 500

    cursor = None
    try:
        cursor = conexion.cursor()
        cursor.execute("DELETE FROM clientes WHERE id=%s", (cliente_id,))
        conexion.commit()

        if cursor.rowcount == 0:
            return jsonify({"success": False, "message": "Cliente no encontrado"}), 404

        return jsonify({"success": True, "message": "Cliente eliminado"}), 200
    except Exception as e:
        if conexion:
            conexion.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()