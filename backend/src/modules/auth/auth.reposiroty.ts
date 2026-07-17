import { type LoginRequest } from './dto/login.request';
import { type LoginResponse } from './dto/login.response';


export const login_repository = (req: LoginRequest) => {
    console.log("haciendo peticion a la base de datos...");
    const respuesta: LoginResponse = {
                token: "token seguro",
                user: {
                    id: 5,
                    name: "maria",
                    email: "maria@gmail.com"
                }    
    };
    return respuesta;
}