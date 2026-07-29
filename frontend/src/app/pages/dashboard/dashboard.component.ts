import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MessageError } from '../../layout/error/error.component';
import { NavbarComponent } from '../../layout/navbar/nav.component';
import { DashboardService} from '../../services/dashboard/dashboard.service';
import { DashboardResponse } from '../../services/dashboard/dashboard.response';
import { ProductoPorVencer } from '../../services/dashboard/dashboard.response';

@Component({
  selector: 'app-product',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    NavbarComponent,
    MessageError
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class Dashboard implements OnInit{

    private readonly dashboard_service = inject(DashboardService);

    usuario:string = "";
    total_productos:number = 0;
    productos_porVencer:number = 0;
    productos_vencidos:number = 0;
    productos_proximos:ProductoPorVencer[] = [];
    ultimos_productos: string[] = [];

    textoError:string = "";
    mostrarError:boolean = false;


    ngOnInit():void{
      
      this.dashboard_service.obtenerDashboard().subscribe({
        next: (respuesta:DashboardResponse) => {
          this.usuario = respuesta.user;
          this.total_productos = respuesta.total_productos;
          this.productos_porVencer = respuesta.total_producto_porvencer;
          this.productos_vencidos = respuesta.total_producto_vencidos;
          this.productos_proximos = respuesta.productos_proximos;
          this.ultimos_productos  = respuesta.ultimos_productos;

        },
        error: (error_server) => {
          this.mostrarError = true;
          this.textoError = error_server.message;
        }
      });
    }

}