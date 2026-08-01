import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MessageError } from '../../../layout/error/error.component';
import { NavbarComponent } from '../../../layout/navbar/nav.component';
import { ListarProductosResponse } from '../../../services/product/productos.response';

import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-listar-productos',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MessageError,
    FormsModule,
    MatTooltipModule,
    NavbarComponent
  ],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss'
})
export class ListarProductos implements OnInit{

    private readonly fb = inject(FormBuilder);
    private readonly router = inject(Router);
    private readonly producto_service = inject(ProductService);

    title:string = '';

    dataSource: ListarProductosResponse[]=[];
    displayedColumns: string[] = 
    [
      'id', 
      'nombre', 
      'categoria',
      'cantidad',
      'fechaCompra',
      'fechaVencimiento',
      'opciones'
    ];

    //mensaje error o informacion
    mensaje:string = '';
    mostrarMensaje:boolean = false;

    //carga de pagina
    isLoading = true;

    constructor() {
        this.title = 'Lista de Productos';
    }

    ngAfterViewInit():void{
      setTimeout(() => {
        this.isLoading = false;
      });
    }

    ngOnInit():void {
   
      this.isLoading = true;
      this.producto_service.listarProductos().subscribe({
        next: (respuesta:ListarProductosResponse[]) => {
          this.dataSource = respuesta;
        },
        error: (error_server) => {
          this.mostrarMensaje = true;
          this.mensaje = error_server.message;
        }
      });
    }

    cerrar_mensaje(){
      this.isLoading = false;
      this.mostrarMensaje = false;
    }
    

}


