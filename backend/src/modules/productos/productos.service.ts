import { CrearProductosRequest } from "../dto/producto/producto.request";
import { CrearProductosResponse } from "../dto/producto/producto.response";
import { crearProductoRepository } from "./productos.repository";

export class ProductoService{

    static async crearProducto(user_id:number, producto:CrearProductosRequest):Promise<CrearProductosResponse>{
        await crearProductoRepository(user_id, producto);
        
        return {message : "Producto creado correctamente"};
    }
}