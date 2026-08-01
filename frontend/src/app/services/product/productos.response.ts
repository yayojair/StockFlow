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
    fechaCompra:Date;
    fechaVencimiento:Date;
    fechaRegistro:Date;
    fechaModificacion:Date;
}