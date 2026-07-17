import { type LoginRequest } from './dto/login.request';
import { login_repository } from './auth.reposiroty';
import { AppErrors } from '../../common/errors/app.error';

export class AuthService{
    
    static login_Service (req: LoginRequest){ 
        if(! this.revisa_password(req.password)){
            throw new AppErrors("contraseña vacia", 400);
        }
        return login_repository(req);
    }

    private static revisa_password (texto:string | undefined | null){
        if(!texto || texto.trim().length === 0){
            return false;
        }
        return true;
    }
}

