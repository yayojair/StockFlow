export interface CrearProductoResponse{
    message:string;
}

/*export interface ListarProductosResponse{
    productos:ListarProductos[];
}*/

export interface ListarProductosResponse {
    id:number;
    nombre:string;
    categoria:string;
    cantidad:number;
    fecha_compra:Date;
    fecha_vencimiento:Date;
    fecha_registro:Date;
    fecha_modificacion:Date;
}

export interface ActualizarProductoResponse{
    message:string;
}