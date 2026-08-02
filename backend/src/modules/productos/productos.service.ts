import { CrearProductosRequest } from "../dto/producto/producto.request";
import { CrearProductosResponse, ListarProductosResponse } from "../dto/producto/producto.response";
import { crearProductoRepository, listarProductosRepository, filtrarProductosRepository, actualizarProductoRepository, eliminarProductoRepository} from "./productos.repository";

export class ProductoService{

    static async crearProducto(user_id:number, producto:CrearProductosRequest):Promise<CrearProductosResponse>{
        await crearProductoRepository(user_id, producto);
        
        return {message : "Producto creado correctamente"};
    }

    static async listarProducto(user_id:number):Promise<ListarProductosResponse[]>{
        
        return await listarProductosRepository(user_id);
    }

    static async filtrarProducto(user_id:number, busqueda:string):Promise<ListarProductosResponse[]>{
        return await filtrarProductosRepository(user_id, busqueda);
    }

    static async actualizarProducto(id_producto:number, datos:ListarProductosResponse):Promise<string>{
        return await actualizarProductoRepository(id_producto, datos);
    }

    static async eliminarProducto(id_producto:number):Promise<string>{
        return await eliminarProductoRepository(id_producto);
    }
}
