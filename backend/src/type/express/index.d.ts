import { TokenUsuario } from "../../common/auth/interfaces/token-user.interface";
import "express";

declare global{
    namespace Express{
        interface Request{
            user?:TokenUsuario;
        }
    }
}

export{}