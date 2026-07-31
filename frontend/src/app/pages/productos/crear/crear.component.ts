import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { CrearProductosRequest } from '../../../services/product/productos.request';

import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { CrearProductoResponse } from '../../../services/product/productos.response';

@Component({
  selector: 'app-crear-producto',
  imports: [
    MatCardModule,
    MatFormFieldModule,
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
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.scss'
})
export class CrearProductos {

    private readonly fb = inject(FormBuilder);
    private readonly router = inject(Router);
    private readonly producto_service = inject(ProductService);

    //valida que los campos no esten vacios
    crearForm: FormGroup;

    title:string = '';

    //mensaje error o informacion
    mensaje:string = '';
    mostrarMensaje:boolean = false;

    //carga de pagina
    isLoading = true;

    constructor() {
        this.title = 'Crear Producto';
        this.crearForm = this.fb.group({
        nombre: ['', [Validators.required]],
        cantidad: ['', [Validators.required]],
        categoria: ['', [Validators.required]],
        fechaCompra: ['', [Validators.required]],
        fechaVencimiento: ['', [Validators.required]],
        });
    }

    ngAfterViewInit():void{
      setTimeout(() => {
        this.isLoading = false;
      });
    }

    onSubmit():void {
      if(this.crearForm.invalid){
        this.crearForm.markAllAsTouched();
        return;
      }

      //poner pagina load
      this.isLoading = true;
      this.crearForm.disable();

      //obtener datos del formulario
      const datos = this.crearForm.value as CrearProductosRequest;

      this.producto_service.crearProducto(datos).subscribe({

        next: (respuesta:CrearProductoResponse) => {
          this.mostrarMensaje = true;
          this.mensaje = respuesta.message;
          setTimeout(() =>{
            this.router.navigate(['/dashboard']);
          }, 1000);
          
            
        },
        error: (error_server) => {
          this.mostrarMensaje = true;
          this.mensaje = error_server.message;
        }
      });;

    }

    cerrar_mensaje(){
      this.crearForm.enable();
      this.isLoading = false;
      this.mostrarMensaje = false;
    }
    

}


