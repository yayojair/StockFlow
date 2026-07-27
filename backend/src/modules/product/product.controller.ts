import { Express, Request, Response } from "express";

export function obtenerProductos(req: Request, res:Response){
    console.log("agregando producto...");
    console.log(req.user);
    return res.status(200).json("exito");
}