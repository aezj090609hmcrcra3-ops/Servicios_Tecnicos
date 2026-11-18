import os
import mysql.connector
from mysql.connector import Error

HOST = os.getenv("DB_HOST", "38are4.h.filess.io")
PORT = int(os.getenv("DB_PORT", 3307))
USER = os.getenv("DB_USER", "tecnico_earnclayhe")
PASSWORD = os.getenv("DB_PASSWORD", "6dec2d165732fca34c381629fe90b9f30295bb15")
DATABASE = os.getenv("DB_NAME", "tecnico_earnclayhe")


def conectar():
    try:
        conexion = mysql.connector.connect(
            host=HOST,
            port=PORT,
            user=USER,
            password=PASSWORD,
            database=DATABASE
        )

        if conexion.is_connected():
            print("Conexión exitosa a la base de datos")
            return conexion

    except Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None