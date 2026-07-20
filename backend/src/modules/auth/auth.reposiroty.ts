import pool_db from '../../common/database/postgres';
import { Usuario } from '../../domain/usuario';
import { type LoginRequest } from './dto/login.request';

export const login_repository = async (req: LoginRequest):Promise<Usuario | null> => {
    console.log("haciendo peticion a la base de datos...");
    const respuesta =  await pool_db.query(
        `SELECT id, nombre, correo, password_hash 
         FROM usuarios
         WHERE correo = $1
         `,
         [req.email]
    );
    return respuesta.rows[0] as Usuario;
}