import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from './token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => { 
    const token_service = inject(TokenService);
    
    const token = token_service.obtenerToken();
    if (token) {
        const reqClonada = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
        });
        return next(reqClonada);
    }
    return next(req);
};