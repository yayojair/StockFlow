export interface CrearProductosResponse{
    message:string;
}

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