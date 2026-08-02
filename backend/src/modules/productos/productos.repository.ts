import pool_db from '../../common/database/postgres';
import { CrearProductosRequest } from '../dto/producto/producto.request';
import { ListarProductosResponse } from '../dto/producto/producto.response';

export const crearProductoRepository = async (user_id:number, datos:CrearProductosRequest):Promise<void> => {
    await pool_db.query(
        `INSERT INTO productos
        (
        nombre,
        categoria,
        cantidad,
        fecha_compra,
        fecha_vencimiento,
        fecha_registro,
        fecha_modificacion,
        id_usuario
        )
        VALUES 
        (
        $1,
        $2,
        $3,
        $4,
        $5,
        NOW(),
        NOW(),
        $6
        )
        `,
        [
        datos.nombre,
        datos.categoria,
        datos.cantidad,
        datos.fechaCompra,
        datos.fechaVencimiento,
        user_id]
    );
}

export const listarProductosRepository = async (id_user:number):Promise<ListarProductosResponse[]> => {
    const respuesta = await pool_db.query(
        `SELECT id, nombre, categoria, cantidad, fecha_compra, fecha_vencimiento,fecha_registro, fecha_modificacion
        FROM productos
        WHERE id_usuario = $1
        `,[id_user]);
    return respuesta.rows;
}

export const filtrarProductosRepository = async (id_user:number, busqueda:string):Promise<ListarProductosResponse[]> => {
    const respuesta = await pool_db.query(
        `SELECT id, nombre, categoria, cantidad, fecha_compra, fecha_vencimiento,fecha_registro, fecha_modificacion
        FROM productos
        WHERE id_usuario = $1 
        AND nombre ILIKE $2
        `,[id_user, `%${busqueda}%`]);
    return respuesta.rows;
}

export const actualizarProductoRepository = async (id_producto:number, datos:ListarProductosResponse):Promise<string> => {
    await pool_db.query(
        `UPDATE productos
        SET nombre = $1,
            categoria = $2,
            cantidad = $3,
            fecha_compra = $4,
            fecha_vencimiento = $5,
            fecha_modificacion = NOW()
        WHERE id = $6
        `,
        [
        datos.nombre,
        datos.categoria,
        datos.cantidad,
        datos.fechaCompra,
        datos.fechaVencimiento,
        id_producto]
    );
    return "Producto actualizado correctamente";
}


