Caso de uso:
Login

Método:
POST

Ruta:
/auth/login

Descripción:
Permite autenticar a un usuario.

Body:
{
    "email": "string",
    "password": "string"
}

Respuesta 200:
{
    "token": "string",
    "user": {
        "id": number,
        "name": "string",
        "email": "string"
    }
}

Errores:

400 Bad Request

401 Unauthorized

500 Internal Server Error

