import jwt from 'jsonwebtoken';
import type { SignOptions } from "jsonwebtoken";
import dotenv from 'dotenv';
import { AppErrors } from '../errors/app.error';
import { TokenUsuario } from './interfaces/token-user.interface';

dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new AppErrors("Falta la variable JWT_SECRET", 500);
}

if (!process.env.JWT_EXPIRES_IN) {
    throw new AppErrors("Falta la variable JWT_EXPIRES_IN", 500);
}

const llave_secreta = process.env.JWT_SECRET as string;
const tiempo_expira = process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"];


export const genera_token = (datos: TokenUsuario): string => {
    return jwt.sign({ ...datos }, llave_secreta, { expiresIn: tiempo_expira});
};

export const verificar = (token: string): TokenUsuario | null => {

    try {
        const verifica = jwt.verify(token, llave_secreta);
        
        if (typeof verifica === 'object' && verifica !== null) {
            return verifica as unknown as TokenUsuario;
        }
        
        return null;
    } catch (error) {
        return null;
    }
};

