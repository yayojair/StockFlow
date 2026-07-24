import bcrypt from 'bcryptjs';
import { AppErrors } from '../../common/errors/app.error';
import { Usuario } from '../../domain/usuario';
import { login_repository } from './auth.reposiroty';
import { type LoginRequest } from './dto/login.request';
import { LoginResponse } from './dto/login.response';
import { genera_token, verificar } from '../../common/auth/jwt.service';

export class AuthService{
    
    static async login_Service (req: LoginRequest):Promise<LoginResponse>{ 
        const usuario =  await login_repository(req);
        
        if (!usuario) {
            throw new AppErrors("Usuario no encontrado", 401);
        }
        
        const verifica = await this.validar_password(req.password, usuario.password_hash);
        
        if(!verifica){
            throw new AppErrors("contraseña incorrecta", 401); 
        }
        
        return this.crear_login_response(usuario);
    }

    private static password_vacio (texto:string | undefined | null){
        
    }

    private static async validar_password (password:string, hash_password:string){
        if(!password || password.trim().length === 0){
            return false;
        }

        const verifica = await bcrypt.compare(password, hash_password);
        return verifica;
    }

    private static crear_login_response(usuario:Usuario){
        const token = genera_token({
                sub: usuario.id,
                email: usuario.correo
        });

        const datos: LoginResponse = {
                    token: token,
                    user: {
                        id: Number(usuario.id),
                        name: usuario.nombre,
                        email: usuario.correo
                    }    
        };
        return datos
    }
}

