import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
//import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { LoginRequest } from './login.request';
import { LoginResponse } from './login.response';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private readonly http = inject(HttpClient);

    public login(datos:LoginRequest): Observable<LoginResponse>{
        console.log("ingresa al authservice");

        return this.http.post<LoginResponse>("http://localhost:3000/auth/login", datos);


    }


    private handleAuthError(error: HttpErrorResponse): Observable<never> {

        let errorMessage = 'Error desconocido en autenticación';

        if (error?.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else if (error) {
            switch (error.status) {
                case 401:
                    errorMessage = 'Credenciales inválidas';
                    break;
                case 403:
                errorMessage = 'Acceso no autorizado';
                    break;
                case 0:
                    errorMessage = 'No se pudo conectar con el servidor';
                    break;
                default:
                    if (error.error && typeof error.error === 'object' && error.error.message) {
                        errorMessage = error.error.message;
                    } else if (error.message) {
                        errorMessage = error.message;
                    }
            }
        }

        return throwError(() => new Error(errorMessage));
    }

}