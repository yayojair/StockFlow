import { Request, Response } from "express";
import { AppErrors } from '../../common/errors/app.error';
import { CrearProductosResponse, ListarProductosResponse } from "../dto/producto/producto.response";
import { CrearProductosRequest } from "../dto/producto/producto.request";
import { ProductoService } from "./productos.service";

export const crearProducto= async (req: Request, res:Response) => {
    try {
        const body: CrearProductosRequest= req.body;
        const user_id:number = req.user?.sub as number;
        
        const service:CrearProductosResponse = await ProductoService.crearProducto(user_id, body);
        return res.status(201).json(service);
        
    } catch (error) {
        if(error instanceof AppErrors){
            res.status(error.statusCode).json({error:error.message});
        }else{
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
}

export const listarProducto= async (req: Request, res:Response) => {
    try {
        const user_id:number = req.user?.sub as number;
        
        const service:ListarProductosResponse[] = await ProductoService.listarProducto(user_id);
        return res.status(201).json(service);
        
    } catch (error) {
        if(error instanceof AppErrors){
            res.status(error.statusCode).json({error:error.message});
        }else{
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
}

