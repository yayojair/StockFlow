import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators'; 
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; 

import { MessageError } from '../../../layout/error/error.component';
import { NavbarComponent } from '../../../layout/navbar/nav.component';
import { ActualizarProductoResponse, ListarProductosResponse,ProductoLit } from '../../../services/product/productos.response';

import { ProductService } from '../../../services/product/product.service';
import { MatTableModule } from '@angular/material/table';
import { ProductoCardComponent } from '../../../layout/productos/producto.card.component';




@Component({
  selector: 'app-listar-productos',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    CommonModule,
    ReactiveFormsModule,
    MessageError,
    FormsModule,
    NavbarComponent,
    ProductoCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss'
})
export class ListarProductos implements OnInit {

    private readonly fb = inject(FormBuilder);
    private readonly producto_service = inject(ProductService);

    title:string = '';
    producto_seleccionado: ListarProductosResponse | ProductoLit |null = null;
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
    isLoading = true;
    controlsForm = new FormControl('');

    mensaje:string = '';
    mostrarMensaje:boolean = false;
    editarForm: FormGroup;
    showEditar = false;
    isLoadingUpdate = false;
    showEliminar = false;
    isLoadingDelete = false;
    showInfo=false;


    constructor() {
        this.title = 'Lista de Productos';
        this.escuchaBusqueda();
        this.editarForm = this.fb.group({
          nombre: ['', [Validators.required]],
          cantidad: ['', [Validators.required]],
          categoria: ['', [Validators.required]],
          fechaCompra: ['', [Validators.required]],
          fechaVencimiento: ['', [Validators.required]],
        });
    }


    ngOnInit():void {
      this.isLoading = true;
      this.cargarProductos();
    }

    private cargarProductos(): void {
      this.isLoading = true;
      this.producto_service.listarProductos().subscribe({
          next: respuesta => {
              this.dataSource = respuesta;
              this.isLoading = false;
          },
          error: error => {
              this.mensajeCard(error.message);
              this.isLoading = false;
          }
      });
    }

    cerrarMensaje(){
      this.isLoading = false;
      this.mostrarMensaje = false;
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
    
    private filtrarProductos(busqueda:string):void {
      if(!busqueda){
        this.cargarProductos();
        return;
      }
      this.producto_service.filtrarProductos(busqueda).subscribe({
        next: (respuesta:ListarProductosResponse[]) => {
          this.dataSource = respuesta;
          this.isLoading = false;
        },
        error: (error) => {
          this.mensajeCard(error.message);
        }
      });
    }

    mostrarCardEditar(producto: ListarProductosResponse): void {
      this.isLoading = true;
      this.producto_seleccionado = producto;
      this.cargarEditarForm(producto);
      this.showEditar = true;
    }

    private cargarEditarForm(producto: ListarProductosResponse): void {
      const fechaCompra = this.modificarFecha(producto.fecha_compra);
      const fechaVencimiento = this.modificarFecha(producto.fecha_vencimiento);
      this.editarForm.patchValue({
        nombre: producto.nombre,
        cantidad: producto.cantidad,
        categoria: producto.categoria,
        fechaCompra: fechaCompra,
        fechaVencimiento: fechaVencimiento,
      });
    }

    private modificarFecha(date:Date){
      return String(date).split('T')[0];
    }

    editarProducto(): void {
      if(this.editarForm.invalid){
        this.editarForm.markAllAsTouched();
        return;
      }
      this.editarForm.disable();
      this.isLoadingUpdate = true;
      
      const datos = this.editarForm.value as ListarProductosResponse;
      const id_producto = this.producto_seleccionado?.id;

      if(id_producto === undefined){
        this.mensajeCard("Error: No se pudo obtener el ID del producto a editar.");
        return;
      }

      this.producto_service.actualizarProducto(id_producto, datos).subscribe({
        next: (respuesta:ActualizarProductoResponse) => {
          this.mensajeCard(respuesta.message);
          setTimeout(() => {
            this.cargarProductos();
          }, 1000);
          
          
        },
        error: (error) => {
          this.mensajeCard(error.message);
        }
      });
    }

    cerrarEditar(){
      this.showEditar = false;
      this.isLoading = false;
    }

    private mensajeCard(message:string):void {
      this.mensaje = message;
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.isLoading = false;
        this.editarForm.enable();
        this.isLoadingUpdate = false;
        this.mostrarMensaje = false;
        this.showEditar = false;
      }, 1000);
      
    }

    mostrarCardEliminar(producto: ListarProductosResponse): void {
      this.producto_seleccionado = producto;
      this.isLoading = true;
      this.showEliminar = true;
    } 

    cancelarEliminar(): void {
      this.showEliminar = false;
      this.isLoading = false;
    }

    eliminarProducto(): void {
      if(!this.producto_seleccionado){
        this.mensajeCard("Error: No se pudo obtener el producto a eliminar.");
        return;
      }
      const id_producto = this.producto_seleccionado.id;
      this.isLoadingDelete = true;

      this.producto_service.eliminarProducto(id_producto).subscribe({
        next: (respuesta:ActualizarProductoResponse) => {
          this.showEliminar = false;
          this.mensajeCard(respuesta.message);
          setTimeout(() => {
            this.cargarProductos();
          }, 1000);
        },
        error: (error) => {
          this.showEliminar = false;
          this.mensajeCard(error.message);
        }
      });
    }
    mostrarCardInfoLit(producto:ListarProductosResponse){
      this.isLoading = true;
      this.showInfo = true;
      this.producto_seleccionado = this.crearProductoLit(producto);
    }

    private crearProductoLit(producto:ListarProductosResponse){
      const producto_lit : ProductoLit = {
        id: producto.id,
        nombre:producto.nombre,
        categoria:producto.categoria,
        cantidad:producto.cantidad,
        fecha_compra:this.modificarFecha(producto.fecha_compra),
        fecha_vencimiento:this.modificarFecha(producto.fecha_vencimiento),
        fecha_registro:this.modificarFecha(producto.fecha_registro),
        fecha_modificacion:this.modificarFecha(producto.fecha_modificacion)
      }
      return producto_lit;
    }

    cerrarCardLit(){
      this.showInfo = false;
      this.isLoading = false;
    }
}


