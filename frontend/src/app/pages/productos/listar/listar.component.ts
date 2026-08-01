import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators'; 
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; 

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
export class ListarProductos implements OnInit {

    private readonly fb = inject(FormBuilder);
    private readonly router = inject(Router);
    private readonly producto_service = inject(ProductService);

    controlsForm = new FormControl('');

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
        this.escuchaBusqueda();
    }

    ngAfterViewInit():void{
      setTimeout(() => {
        this.isLoading = false;
      });
    }

    ngOnInit():void {
      this.isLoading = true;
      this.cargarProductos();
    }

    cerrar_mensaje(){
      this.isLoading = false;
      this.mostrarMensaje = false;
    }
    
    filtrarProductos(busqueda:string):void {
      if(!busqueda){
        this.cargarProductos();
        return;
      }
      this.producto_service.filtrarProductos(busqueda).subscribe({
        next: (respuesta:ListarProductosResponse[]) => {
          this.dataSource = respuesta;
          this.isLoading = false;
        },
        error: (error_server) => {
          this.mostrarMensaje = true;
          this.mensaje = error_server.message;
          this.isLoading = false;
        }
      });
    }

    private cargarProductos(): void {

      this.producto_service.listarProductos().subscribe({
          next: respuesta => {
              this.dataSource = respuesta;
              this.isLoading = false;
          },
          error: error => {
              this.mensaje = error.message;
              this.mostrarMensaje = true;
              this.isLoading = false;
          }
      });
    }
    
    private escuchaBusqueda(): void {
      this.controlsForm.valueChanges.pipe(
          debounceTime(400),
          distinctUntilChanged(),
          takeUntilDestroyed()
        ).subscribe(value => {
          this.filtrarProductos(value || '');
        });
    }
}


