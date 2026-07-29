export interface DashboardResponse{
    user:string;
    total_productos: number;
    total_producto_porvencer: number;
    total_producto_vencidos: number;
    productos_proximos: ProductoPorVencer[];
    ultimos_productos: string [];
}

export interface ProductoPorVencer {
    nombre:string; 
    fecha_vencimiento:Date;
}
