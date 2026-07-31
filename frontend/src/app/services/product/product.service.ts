import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
//import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError } from 'rxjs';

import { CrearProductosRequest } from './productos.request';
import { CrearProductoResponse } from './productos.response';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
    private readonly http = inject(HttpClient);

    public crearProducto(datos:CrearProductosRequest): Observable<CrearProductoResponse>{
        return this.http.post<CrearProductoResponse>("http://localhost:3000/productos/crear", datos).pipe(
            catchError((error:HttpErrorResponse) => this.handleAuthError(error))
        );
    }

    private handleAuthError(error: HttpErrorResponse): Observable<never> {

        let errorMessage = 'Error desconocido';
        console.log(error.status);
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