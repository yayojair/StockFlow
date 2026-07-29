import pool_db from '../../common/database/postgres';
import { ProductoPorVencer } from '../dto/dashboard/dashboard.response';


export const obtenerUsuario = async (id_usuario:number):Promise<string> => {
    const respuesta =  await pool_db.query(
        `SELECT nombre 
         FROM usuarios
         WHERE id = $1
         `,
         [id_usuario]
    );
    return respuesta.rows[0].nombre;
}

export const totalProductos = async (id_usuario:number):Promise<number> => {
    const respuesta = await pool_db.query(
        `SELECT COUNT(*)
         FROM productos
         WHERE id_usuario = $1
        `,
        [id_usuario]
    );
    return Number(respuesta.rows[0].count);
}
export const totalPorvencer = async (id_usuario:number):Promise<number> => {
    const respuesta = await pool_db.query(
        `SELECT COUNT(*)
         FROM productos
         WHERE id_usuario = $1 
         AND fecha_vencimiento 
         BETWEEN  CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
        `,
        [id_usuario]
    );
    return Number(respuesta.rows[0].count);
}
export const totalCaducados = async (id_usuario:number):Promise<number> => {
    const respuesta = await pool_db.query(
        `SELECT COUNT(*)
         FROM productos
         WHERE id_usuario = $1 
         AND fecha_vencimiento < CURRENT_DATE
        `,
        [id_usuario]
    );
    return Number(respuesta.rows[0].count);
}

export const porVencer = async (id_usuario:number):Promise<ProductoPorVencer[]> => {
    const respuesta = await pool_db.query(
        `SELECT nombre, fecha_vencimiento
         FROM productos
         WHERE id_usuario = $1 
         AND fecha_vencimiento 
         BETWEEN  CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
         ORDER BY fecha_vencimiento;
        `,
        [id_usuario]
    );
    return respuesta.rows;
}

export const ultimosProductos = async (id_usuario:number):Promise<string []> => {
    const respuesta = await pool_db.query(
        `SELECT nombre
         FROM productos
         WHERE id_usuario = $1
         ORDER BY fecha_registro DESC
         LIMIT 5
        `,
        [id_usuario]
    );
    const ultimos_productos = respuesta.rows.map(item => item.nombre);
    return ultimos_productos;
}





