# Servicios Técnicos

## Descripción
Aplicación web orientada a la gestión y administración de clientes, técnicos y servicios técnicos.

## Tecnologías
* **Frontend:** React, JavaScript, CSS
* **Backend:** Python, Flask
* **Base de datos:** MySQL
* **Pruebas de API:** Thunder Client

## Requisitos
* Python 3.x y `pip`
* Node.js y `npm`
* Servidor MySQL
* Git

## Configuración

1. Clonar el repositorio localmente.
2. Crear la base de datos `tecnico` en MySQL.
3. Ejecutar el script SQL correspondiente para crear las tablas (`cliente`, `tecnico`, `servicio`, etc.).
4. Copiar el archivo `.env.example` a `.env` y configurar los parámetros de conexión local:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_contraseña
   DB_NAME=tecnico
   FLASK_DEBUG=0