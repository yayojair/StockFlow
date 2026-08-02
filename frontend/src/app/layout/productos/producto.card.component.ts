import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 



@Component({
  selector: 'app-producto-card',
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
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './producto.card.component.html',
  styleUrl: './producto.card.component.scss'
})
export class ProductoCardComponent {

    private readonly fb = inject(FormBuilder);
    
    @Input()
    productoForm: FormGroup;

    @Input()
    title:string = '';

    @Output()
    onSubmitEvent = new EventEmitter<void>();

    constructor() {
        this.title = 'Crear Producto';
        this.productoForm = this.fb.group({
        nombre: ['', [Validators.required]],
        cantidad: ['', [Validators.required]],
        categoria: ['', [Validators.required]],
        fechaCompra: ['', [Validators.required]],
        fechaVencimiento: ['', [Validators.required]],
        });
    }
    
    onSubmit(){
      this.onSubmitEvent.emit();
    }
}


