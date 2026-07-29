import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { DashboardResponse } from './dashboard.response';


@Injectable({
  providedIn: 'root'
})

export class DashboardService {
    private readonly http = inject(HttpClient);

    public obtenerDashboard():Observable<DashboardResponse>{
        
        return this.http.get<DashboardResponse>("http://localhost:3000/dashboard").pipe(
            catchError((error:HttpErrorResponse) => this.handleAuthError(error))
        );
    }

    private handleAuthError(error: HttpErrorResponse): Observable<never> {

        let errorMessage = 'Error desconocido en autenticación';
        if (error?.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else if (error) {
            switch (error.status) {
                case 401:
                    errorMessage = 'Datos no encontrados';
                    break;
                case 403:
                    errorMessage = 'Acceso no autorizado';
                    break;
                case 500:
                    errorMessage = 'No se pudo conectar con el servidor';
                    break;
                default:
                    break;
            }
        }

        return throwError(() => new Error(errorMessage));
    }
}