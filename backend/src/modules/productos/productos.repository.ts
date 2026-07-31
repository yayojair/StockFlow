import pool_db from '../../common/database/postgres';
import { CrearProductosRequest } from '../dto/producto/producto.request';


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





