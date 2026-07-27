import {Request, Response, NextFunction} from 'express';
import { verificar } from '../common/auth/jwt.service';


export const authMiddleware = (req: Request, res:Response, next: NextFunction) => {
    const auth_header  = req.headers.authorization;
    
    if(!auth_header){
        return res.status(401).json({
            error: "Unauthorized"
        });
    }

    const [scheme, token] = auth_header.split(" ");

    if(scheme !== "Bearer" || !token){
        return res.status(401).json({
            error: "Unauthorized"
        });
    }

    const usuario = verificar(token);

    if (!usuario) {
        return res.status(401).json({
            error: "Token inválido"
        });
    }

    req.user = usuario;

    return next();
};