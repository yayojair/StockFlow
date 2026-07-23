import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LoginRequest } from './login.request';
import { LoginResponse } from './login.response';

import { AuthService} from './auth.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    //FadeInDirective,
    FormsModule,
    //LoaderComponent,
    MatTooltipModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class Login {

    private readonly fb = inject(FormBuilder);
    private readonly router = inject(Router);
    private readonly auth_service = inject(AuthService);

    //valida que los campos no esten vacios
    loginForm: FormGroup;

    title = '';

    //mensaje error o informacion
    message = '';
    showMessage = false;

    //carga de pagina
    isLoading = true;

    //logo de la app
    img = '';

    //ocultar elementos html
    hide = true;

    constructor() {
        this.title = 'StockFlow';
        this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        rememberMe: [false]
        });
    }

    ngAfterViewInit():void{
      setTimeout(() => {
        this.isLoading = false;
      });
    }

    onSubmit():void {
      if(this.loginForm.invalid){
        this.loginForm.markAllAsTouched();
        return;
      }

      //poner pagina load
      this.isLoading = true;

      //obtener datos del formulario
      const datos = this.loginForm.value as LoginRequest;
      this.auth_service.login(datos).subscribe({
        next: (respuesta) => {
          console.log('Datos recibidos con éxito:', respuesta); 
        },
        error: (error_server) => {
          console.error('Hubo un error en la petición:', error_server);
        },
        complete: () => {

        }
      });;

    }

}
