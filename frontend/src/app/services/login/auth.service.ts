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

        return this.http.post<LoginResponse>("http://localhost:3000/auth/login", datos).pipe(
            catchError((error:HttpErrorResponse) => this.handleAuthError(error))
        );
    }

    private handleAuthError(error: HttpErrorResponse): Observable<never> {

        let errorMessage = 'Error desconocido';
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
                case 500:
                    errorMessage = 'Error en el servidor';
                    break;
                case 0:
                    errorMessage = "No se pudo conectar con el servidor";
                    break;
                default:
                    break;
            }
        }

        return throwError(() => new Error(errorMessage));
    }

}