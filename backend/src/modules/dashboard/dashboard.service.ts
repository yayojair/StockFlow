import { AppErrors } from "../../common/errors/app.error";
import { DashboardResponse } from "../dto/dashboard/dashboard.response";
import { obtenerUsuario, totalProductos, totalPorvencer, totalCaducados, porVencer, ultimosProductos } from "./dashboard.repository";

export class DashboardService{

    static async obtenerDashboard(id_usuario:number):Promise<DashboardResponse>{
        const user =  await obtenerUsuario(id_usuario);

        if (!user) {
            throw new AppErrors("Usuario no encontrado", 401);
        }

        const total_productos = await totalProductos(id_usuario);
        const total_producto_porvencer = await totalPorvencer(id_usuario);
        const total_producto_vencidos = await totalCaducados(id_usuario);
        const productos_proximos = await porVencer(id_usuario);
        const ultimos_productos = await ultimosProductos(id_usuario);

        const resultados: DashboardResponse = {
            user, 
            total_productos,
            total_producto_porvencer,
            total_producto_vencidos, 
            productos_proximos,
            ultimos_productos
        }
        return resultados;
    }
}