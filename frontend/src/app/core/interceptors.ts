import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from './token.service';
import { EMPTY, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';


export const authInterceptor: HttpInterceptorFn = (req, next) => { 
    const token_service = inject(TokenService);
    const route = inject(Router);
    const token = token_service.obtenerToken();

    const peticion = token 
    ? req.clone({setHeaders: {Authorization: `Bearer ${token}`}}) 
    : req;

    return next(peticion).pipe(
        catchError((error) => {
            return handleAuthError(error, peticion, token_service, route);
        })
    );
};



function handleAuthError(error: HttpErrorResponse, req: HttpRequest<unknown>, token_service:TokenService, route:Router): Observable<never> {

    if(error.status === 401 && req.headers.has('Authorization')){
        token_service.eliminarToken();
        route.navigate(['/login']);
        return EMPTY;
    }
    
    return throwError(() => error);
}