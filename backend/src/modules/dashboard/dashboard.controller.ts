import { Express, Request, Response } from "express";
import { AppErrors } from '../../common/errors/app.error';
import { DashboardResponse } from "../dto/dashboard/dashboard.response";
import { DashboardService } from "./dashboard.service";


export const obtenerDashboard= async (req: Request, res:Response) => {
    try {
        const id_user = req.user?.sub as number;

        const service: DashboardResponse = await DashboardService.obtenerDashboard(id_user);
        return res.status(200).json(service);
        
    } catch (error) {
        if(error instanceof AppErrors){
            res.status(error.statusCode).json({error:error.message});
        }else{
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
}