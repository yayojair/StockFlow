import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService{
    private readonly llave = "token";

    guardarToken(token:string){
        localStorage.setItem(this.llave,token);
    }

    obtenerToken():string|null{
        const token = localStorage.getItem(this.llave);
        if(!token){
            return null;
        }
        return token;
    }

    eliminarToken(){
        localStorage.removeItem(this.llave);
    }
}